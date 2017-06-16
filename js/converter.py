#!python
# convert the vimwiki index pages into the JSON object to be loaded by the
# vimwiki.js
import json
import sys
inputfile = sys.argv[1]
outputfile = sys.argv[2]

if outputfile == '':
  print(stderr,"usages: {} input output".format(sys.argv[0]))
  exit(1)

vimwiki = dict()
def getIntro(filename,vimwiki):
  first = ''
  second = ''
  with open(filename,"r",encoding="utf8") as f:
    for l in f:
      l = l.strip()
      if l.startswith('= INTRO ='):
        l = l.replace('= ','').replace(' =','').lower()
        first = l
        second = ''
        vimwiki[first] = dict()
      elif l.startswith('== '):
        l = l.replace('== ','').replace(' ==','').lower()
        second = l
        vimwiki[first][second] = '';
      elif l.startswith('= PAGES ='):break
      elif second != '' and l != '':
        vimwiki[first][second] += l + "\n"

def getPages(filename,vimwiki):
  """
  pages are organized as 2 dimensions arrays.
  """
  process = 0
  first = ''
  with open(filename,'r',encoding='utf8') as f:
    for l in f:
      l = l.rstrip()
      if l.startswith('= PAGES ='):
        process = 1
        vimwiki['pages'] = []
      elif process:
        if l.startswith('*'):
          first = l = l.replace('* ','')
          vimwiki['pages'].append([first])
        elif l.startswith(' *'):
          l = l.replace(' * ','')
          l = l.replace('[[','').replace(']]','')
          vimwiki['pages'][-1].append(l)

def write(filename,vimwiki):
  headers = """
// This section is converted from the index.wiki with an external tools:
//  index-converter.py
var vimwiki = 
"""
  with open(filename,'w',encoding='utf8') as f:
    f.write(headers) 
    json.dump(vimwiki,f,indent=4)
    f.write(';')

getIntro(inputfile,vimwiki)
getPages(inputfile,vimwiki)
write(outputfile,vimwiki)



