from flask import Blueprint, render_template, request

from controllers import controller_chatbot

chatbot_blueprint = Blueprint('urls', __name__)


@chatbot_blueprint.route("/chatbot")
def chat_bot_main():
    user_input = str(request.args.get('user_input', ""))
    chat_answer = controller_chatbot.get_response(user_input)
    return render_template("chatbot.html", answer=chat_answer)


@chatbot_blueprint.route("/chatbot_answers", methods=('GET', 'POST'))
def chat_bot_interacts():
    if request.method == 'POST':
        content = request.form.get('user_input', "")

        chat_answer = controller_chatbot.get_response(content)
        return render_template("chatbot.html", answer=chat_answer)

    return render_template("chatbot.html", answer="")
