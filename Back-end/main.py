import os
import sys
import site
import uuid
import subprocess
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

# Enable CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount output directory to serve static files
base_dir = os.path.dirname(os.path.abspath(__file__))
output_dir = os.path.join(base_dir, "output")
os.makedirs(output_dir, exist_ok=True)
app.mount("/output", StaticFiles(directory=output_dir), name="output")

class BoxRequest(BaseModel):
    width: float
    height: float
    depth: float
    thickness: float

def get_boxes_exe_path():
    """
    Calculates the absolute path of boxes.exe based on the active Python environment.
    Checks both system/venv Scripts and User Scripts (AppData).
    """
    candidates = []

    # 1. System/Venv Scripts (e.g., C:\Python314\Scripts\boxes.exe)
    # Using sys.prefix is more reliable for venvs than dirname(sys.executable)
    candidates.append(os.path.join(sys.prefix, "Scripts", "boxes.exe"))
    
    # Fallback to executable dir if Scripts is parallel to python.exe
    candidates.append(os.path.join(os.path.dirname(sys.executable), "Scripts", "boxes.exe"))

    # 2. User Scripts (AppData/Roaming/Python/PythonXY/Scripts/boxes.exe)
    try:
        user_base = site.getuserbase() # e.g., .../AppData/Roaming/Python
        if user_base:
            version_dir = f"Python{sys.version_info.major}{sys.version_info.minor}"
            candidates.append(os.path.join(user_base, version_dir, "Scripts", "boxes.exe"))
    except Exception:
        pass

    # Check candidates
    for path in candidates:
        if os.path.isfile(path):
            return path
            
    return None

@app.post("/generate-box")
async def generate_box(params: BoxRequest):
    boxes_exe = get_boxes_exe_path()
    
    if not boxes_exe:
        # Debug info to help user if it fails
        search_paths = [os.path.dirname(p) for p in [os.path.join(sys.prefix, "Scripts"), site.getuserbase()]]
        raise HTTPException(
            status_code=500, 
            detail=f"Critical Error: 'boxes.exe' not found. Searched in standard Scripts folders based on {sys.executable}. Please ensure 'boxes' is installed via 'pip install boxes'."
        )

    # Output directory handling
    base_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(base_dir, "output")
    os.makedirs(output_dir, exist_ok=True)

    # Generate filename
    file_id = str(uuid.uuid4())
    filename = f"box_{file_id}.svg"
    output_path = os.path.join(output_dir, filename)

    # Construct format: 'output/filename.svg' for frontend
    relative_path = f"output/{filename}"

    # Build command for UniversalBox
    # Mapping: width->x, depth->y, height->h
    cmd = [
        boxes_exe,
        "UniversalBox",
        "--x", str(params.width),
        "--y", str(params.depth),
        "--h", str(params.height),
        "--thickness", str(params.thickness),
        "--format", "svg",
        "--output", output_path
    ]

    try:
        # Run process
        # Using shell=False is safer and usually works fine with absolute path to exe
        result = subprocess.run(cmd, capture_output=True, text=True, check=False)

        if result.returncode != 0:
            print(f"Error generating box: {result.stderr}")
            raise HTTPException(status_code=500, detail=f"Boxes.py failed: {result.stderr}")

        return {"svg_path": relative_path}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
