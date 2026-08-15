import re,sys
p=r"baseline/wk15-days.md"
lines=open(p,encoding="utf-8").read().split("\n")
idx=[i for i,l in enumerate(lines) if l.startswith("<a id=")]
idx.append(len(lines))
def words(ls):
    t="\n".join(ls)
    t=re.sub(r"<[^>]+>"," ",t)
    t=re.sub(r"[*_#>`]"," ",t)
    t=re.sub(r"[^\w\s'’–-]"," ",t)
    return len([w for w in t.split() if re.search(r"[A-Za-z0-9]",w)])
for k in range(len(idx)-1):
    blk=lines[idx[k]:idx[k+1]]
    day=re.search(r"day-(\d+)",blk[0]).group(1)
    # schedule block
    s=[i for i,l in enumerate(blk) if l.startswith("### ⏰")][0]
    e=next(i for i in range(s+1,len(blk)) if blk[i].startswith("###"))
    prose=blk[:s]+blk[e:]
    schedw=words(blk[s:e])
    # counts
    def steps(header):
        i=[j for j,l in enumerate(blk) if l.startswith(header)]
        if not i: return None
        i=i[0]
        # find numbered list after
        n=0
        for l in blk[i:]:
            if l.startswith("###") and not l.startswith(header): 
                if n>0: break
            if re.match(r"^\d+\. ",l): n+=1
            if n>0 and l.startswith("> 💡"): break
        return n
    def bullets(header):
        i=[j for j,l in enumerate(blk) if l.startswith(header)][0]
        n=0
        for l in blk[i+1:]:
            if l.startswith("###") or l.startswith("> 👶") or l.startswith("---"): break
            if l.startswith("- "): n+=1
        return n
    main=steps("### 🎨 The Main Event")
    sec=steps("### 🎨 Second Main Event")
    alt=bullets("### 🎯 Afternoon Alternatives")
    out=bullets("### 🌳 Out Again")
    # insight body
    ii=[j for j,l in enumerate(blk) if l.startswith("> 🧠")][0]
    body=[]
    for l in blk[ii+2:]:
        if not l.startswith(">"): break
        body.append(l)
    print(day, "prose=",words(prose), "sched=",schedw, "main=",main,"sec=",sec,"alt=",alt,"out=",out,"insight=",words(body))
