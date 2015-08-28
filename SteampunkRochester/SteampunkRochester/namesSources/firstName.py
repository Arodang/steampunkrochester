import re
import json

nameFile = open('firstNameInput.txt', 'r')
maleNameFile = open('maleNames.txt', 'w')
femaleNameFile = open('femaleNames.txt', 'w')

maleNameList = []
femaleNameList = []

for line in nameFile:
	result = re.search('<td align="center">(.*)<\/td> <td>([0-9]*,[0-9]*)<\/td> <td align="center">(.*)<\/td> <td>([0-9]*,[0-9]*)<\/td>', line)
	if result != None:
		maleNameList.append(result.group(1))
		femaleNameList.append(result.group(3))

maleNameFile.write(json.dumps(maleNameList))
femaleNameFile.write(json.dumps(femaleNameList))

nameFile.close()
maleNameFile.close()
femaleNameFile.close()