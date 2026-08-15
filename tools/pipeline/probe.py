import re
t=open("C:/Users/Josep/The-Big-Book-of-Little-Days-2027/months/01-jan-w1.md",encoding='utf-8').read()
days=[d for d in re.split(r'(?=<a id="day-)',t) if re.search(r'^<a id="day-\d',d)]
def strip_sched(d, drop_heading=True):
    out=[];s=False
    for l in d.split('\n'):
        if l.startswith('### \u23f0'):
            s=True
            if drop_heading: continue
        if s:
            if l.startswith('- **'): continue
            if l.strip()=='' : continue
            s=False
        out.append(l)
    return '\n'.join(out)
def clean(p):
    p=re.sub(r'<[^>]+>','',p)
    p=re.sub(r'[#>*`\u00b7]',' ',p)
    return p
for d in days:
    n=re.search(r'day-(\d+)',d).group(1)
    a=clean(strip_sched(d))
    v={}
    v['ws']=len(a.split())
    v['ws_keephead']=len(clean(strip_sched(d,False)).split())
    # emoji removed
    noemo=re.sub(r'[\U0001F000-\U0001FAFF\u2600-\u27BF\uFE0F\u2B00-\u2BFF]','',a)
    v['noemoji']=len(noemo.split())
    # split on hyphen/slash too
    v['tok']=len(re.findall(r"[A-Za-z0-9'\u2019]+",noemo))
    v['tok_kd']=len(re.findall(r"[A-Za-z0-9'\u2019\-]+",noemo))
    print(n,v)
