import json
import random
import re
from typing import Optional


def random_string() -> str:
    random_list = [
        "Could you try being more descriptive?",
        "Sorry, I cannot help you about that.",
        "Do you mind trying to rephrase that?",
        "I apologize, I didn't quite understand that.",
        "I can't answer that just yet, please if you must, try asking something else.",
    ]

    list_count = len(random_list)
    random_item = random.randrange(list_count)

    return random_list[random_item]


# Load JSON data
def load_json(file) -> dict:
    with open(file) as pre_defined_responses:
        print(f"The file '{file}' was successfully loaded.")
        return json.load(pre_defined_responses)


# Store JSON data
response_data: dict = load_json("../database/knowledge_base.json")
synonym_list: dict = load_json("../database/synonyms.json")


def get_list_from_string(string_input: str) -> list:
    return string_input.split(";") if string_input else []


def get_response(input_string: Optional[str] = ""):
    split_message = re.split(r"\s+|[,;?!.-]\s*", input_string.lower())
    response_scores = []

    if input_string == "":
        return "Please type something so we can chat :("

    for response in response_data:
        expected_user_input = get_list_from_string(response["user_input"])
        response_score = 0
        required_score = 0
        required_words = get_list_from_string(response["required_words"])

        if required_words:
            for word in split_message:
                if word in required_words:
                    required_score += 1
                else:
                    for required_word in required_words:
                        synonyms: list = synonym_list.get(required_word)
                        if synonyms and word in synonyms:
                            response_score += 1

        is_aproximation = False
        if required_score == len(required_words):
            for word in split_message:
                if word in expected_user_input:
                    response_score += 1
        else:
            for word in split_message:
                if word in expected_user_input:
                    response_score += 1
                is_aproximation = True

        response_scores.append(response_score)

    best_response = max(response_scores)
    response_index = response_scores.index(best_response)

    if best_response != 0:
        return response_data[response_index]["answer"]
    return random_string()
