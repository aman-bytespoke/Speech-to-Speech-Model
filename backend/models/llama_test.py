from llama_cpp import Llama

llm = Llama(model_path="C:\speech model\Speech-to-Speech-Model\models\backend")

response = llm("Hello, how are you?")
print(response)
