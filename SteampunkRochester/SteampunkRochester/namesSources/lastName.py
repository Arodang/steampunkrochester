import re
import json

nameFile = open('lastNameInput.txt', 'r')
lastNameFile = open('lastNames.txt', 'w')

lastNameList = []

for line in nameFile:
	result = re.search('<b> ([a-zA-Z]+) <\/b>', line)
	if result != None:
		lastNameList.append(result.group(1))

lastNameFile.write(json.dumps(lastNameList))

nameFile.close()
lastNameFile.close()