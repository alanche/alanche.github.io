#!python
# convert the vimwiki index pages into the JSON object to be loaded by the
# vimwiki.js
import json
import sys
filename = "E:/sites/vimwiki/index.wiki"

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
  process = 0
  first = ''
  with open(filename,'r',encoding='utf8') as f:
    for l in f:
      l = l.rstrip()
      if l.startswith('= PAGES ='):
        process = 1
        vimwiki['pages'] = dict()
      elif process:
        if l.startswith('*'):
          first = l = l.replace('* ','')
          vimwiki['pages'][first] = []
        elif l.startswith(' *'):
          l = l.replace('* ','').replace('[[','').replace(']]','')
          vimwiki['pages'][first] += [l]

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

getIntro(filename,vimwiki)
getPages(filename,vimwiki)
write('vimwiki_db.js',vimwiki)



