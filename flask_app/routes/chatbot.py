from flask import Blueprint, render_template, request

from controllers import controller_chatbot

chatbot_blueprint = Blueprint('urls', __name__)


@chatbot_blueprint.route("/chatbot", methods=('GET',))
def chatbot():
    return render_template("chatbot.html")


@chatbot_blueprint.route("/chatbot_answers", methods=('POST',))
def chatbot_answers():
    body = request.json
    content = body.get('user_input')

    chat_answer = controller_chatbot.get_response(content)

    return chat_answer
