import os
from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config
import pandas as pd
import pickle
import pipeline

@view_config(route_name='home', renderer='templates/home.html')
def home_page(request):
    return {}

@view_config(route_name='login', renderer='templates/login.html')
def login_page(request):
    if request.method == 'POST':
        username = request.params.get('username')
        password = request.params.get('password')
        if authenticate(username, password):
            return Response('Login Successful!')
        else:
            return Response('Failed login', status=401)
    return {}

@view_config(route_name='hello')
def hello_world(request):
    return Response("Server is Up and running")

@view_config(route_name="check", renderer="json", request_method="POST", openapi=True)
def check(request):
    text = request.params['text']
    df = pd.DataFrame([text], columns=["text"])
    pred = SA.model_inference(model, df)
    return {"Prediction": "Positive Sentiment" if pred[0] else "Negative Sentiment"}

if __name__ == "__main__":
    model = pickle.load(open("Model/MultinomialNB.pkl", "rb"))
    SA = pipeline.Sentiment_Analysis(test=True)

    with Configurator() as config:
        config.include("pyramid_openapi3")
        config.pyramid_openapi3_spec("docs/apidocs.yaml")
        config.pyramid_openapi3_add_explorer()
        config.add_route("check", "/check")
        config.add_route("hello", "/")
        config.add_route('login', '/login')
        config.add_route('home', '/home')
        config.scan()
        app = config.make_wsgi_app()
    print("Server started at http://localhost:5001")
    print("Swagger UI documentation can be found at http://localhost:5000/docs/")
    server = make_server("0.0.0.0", 5001, app)
    server.serve_forever()
