import io
import torch
import base64

from PIL import Image
from diffusers import DiffusionPipeline, EulerAncestralDiscreteScheduler
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

pipeline = DiffusionPipeline.from_pretrained(
    "sudo-ai/zero123plus-v1.1", custom_pipeline="sudo-ai/zero123plus-pipeline",
    torch_dtype=torch.float32
)

pipeline.scheduler = EulerAncestralDiscreteScheduler.from_config(
    pipeline.scheduler.config, timestep_spacing='trailing'
)

pipeline.to('cpu')
# pipeline.to('cuda:0') # Si tienes una GPU insana se puede cambiar a esto, esto usa más recursos y es más rápido

@app.route('/process_Image', methods=['POST'])

def process_Image():
    data = request.get_json()

    imagen_b64 = data['dibujo'].split(',')[1]
    imagen_bytes = base64.b64decode(imagen_b64)

    cond = Image.open(io.BytesIO(imagen_bytes)).convert("RGB")

    result = pipeline(cond, num_inference_steps=75).images[0]

    buffer = io.BytesIO()
    result.save(buffer, format='PNG')
    
    result_bytes = base64.b64encode(buffer.getvalue())

    sprites = result_bytes.decode('utf-8')

    return jsonify(sprites)


if __name__ == '__main__':
    app.run(port=8000)