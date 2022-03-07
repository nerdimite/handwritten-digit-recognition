import os
from pathlib import Path
from hub import hub_handler
from PIL import ImageOps
import torch
from torchvision import transforms
from utils import convert_base64_to_image

# Load model
MODEL_DIR = Path(os.getenv("MODEL_DIR"))
model = torch.jit.load(MODEL_DIR / 'model_jit.pth')

# Image transformations
preprocess = transforms.Compose([
    transforms.Resize((28, 28)),
    transforms.ToTensor()
])

def predict(image):
    # Preprocess
    img_tensor = preprocess(ImageOps.grayscale(image)).unsqueeze(0)
    
    # Inference
    with torch.inference_mode():
        logits = model(img_tensor)
        probs = logits.softmax(dim=-1).squeeze()
    
    # Postprocessing
    output = []
    for i, prob in enumerate(probs):
        output.append((i, round(prob.item() * 100, 2)))
    
    return sorted(output, key=lambda x: x[1], reverse=True)

@hub_handler
def inference_handler(inputs, _):
    '''The main inference function which gets triggered when the API is invoked'''

    # Read image
    image = convert_base64_to_image(inputs, 'pillow')
    
    # Predict
    output = predict(image)

    return output
