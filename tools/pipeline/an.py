import re,json,sys
p=sys.argv[1]
t=open(p,encoding='utf-8').read().replace('\r\n','\n')
days=re.split(r'(?m)^<a id="day-(\d+)"></a>\n',t)
# days[0]=preamble, then pairs
out=[]
def words(s):
    s=re.sub(r'<[^>]+>','',s)
    s=re.sub(r'[*_`>#]','',s)
    return len([w for w in re.split(r'\s+',s) if re.search(r'[A-Za-z0-9]',w)])
for i in range(1,len(days),2):
    n=int(days[i]); body=days[i+1]
    lines=body.split('\n')
    sched=[l for l in lines if re.match(r'^- \*\*\d',l)]
    schedw=sum(words(l) for l in sched)
    tot=words(body)
    # sections
    secs={}
    cur=None
    for l in lines:
        m=re.match(r'^### (.*)',l)
        if m: cur=m.group(1); secs[cur]=[]
        elif cur is not None: secs[cur].append(l)
    def find(k):
        for kk in secs:
            if k in kk: return secs[kk]
        return None
    def nsteps(sec):
        if sec is None: return -1
        return len([l for l in sec if re.match(r'^\d+\. ',l)])
    def nbul(sec):
        if sec is None: return -1
        return len([l for l in sec if re.match(r'^- ',l)])
    main=find('The Main Event'); sec2=find('Second Main Event')
    alt=find('Afternoon Alternatives'); out2=find('Out Again')
    # insight body
    ins=re.search(r'> 🧠 \*\*A Little Parenting Insight\*\*\n> \*\*(.*?)\*\*\n((?:> .*\n)+)',body)
    insw=words(ins.group(2)) if ins else -1
    out.append(dict(day=n,prose=tot-schedw,mainSteps=nsteps(main),secondSteps=nsteps(sec2),
        altBullets=nbul(alt),outAgainBullets=nbul(out2),insightWords=insw,schedRows=len(sched)))
print(json.dumps(out,indent=1))
