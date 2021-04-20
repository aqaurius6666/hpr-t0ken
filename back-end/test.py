import json

with open('token-abi.json', 'r') as f:
    json_file = json.load(f)

contracts = json_file['output']['contracts']
list_abi = []
for key, value in contracts.items():
    for key_, value_ in value.items():
        print(key_)
        with open(f'{key_}.json', 'w') as f:
            json.dump(value_['abi'], f)
        