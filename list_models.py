import google.generativeai as genai

genai.configure(api_key="AIzaSyDiQ5Jy9-3K5SPAgi4e-HfifN_rua8jJAU")

print("\nAvailable models that support generateContent:\n")
for model in genai.list_models():
    if "generateContent" in getattr(model, "supported_generation_methods", []):
        print("-", model.name)
