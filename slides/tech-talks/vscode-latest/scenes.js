/*
  Deck-local visuals for the announcement-first recipe. Feature UI is drawn as
  an illustrative schematic, never as a captured VS Code screen. Each settled
  scene names release/date/status, the use case, action, proof path, and boundary.
*/
(() => {
  const { svg:v, html, esc } = window.Kit;
  const SC = {};
  const tx = (x,y,s,cls='t-sm',anchor='start') => v.text(x,y,s,{cls,anchor});
  const lines = (x,y,s,max=40,cls='t-sm',lh=24) => v.lines(x,y,s,{max,cls,lh,anchor:'start'});
  const box = (x,y,w,h,title,body,z='purple') =>
    v.g(v.rect(x,y,w,h,{cls:'box vl-window',r:8})+
      tx(x+16,y+24,title,'t-xs t-mono z-text')+
      v.path(`M${x+16} ${y+34}h${w-32}`,{cls:'wire z-stroke'})+
      body,{cls:`z-${z}`});
  const rule = (x,y,w,z='accent') => v.g(v.path(`M${x} ${y}h${w}`,{cls:'wire z-stroke'}),{cls:`z-${z}`});
  const arrow = (x,y,x2,z='purple',at=500) =>
    v.trace(`M${x} ${y}H${x2}`,{cls:`wire z-${z}`,at,dur:420})+
    v.pop(v.path(`M${x2-10} ${y-8}L${x2} ${y}L${x2-10} ${y+8}`,{cls:`wire z-${z}`}),at+280);
  const accent = (part) => ['purple','remote','orange','green'][Math.max(0,part-1)] || 'purple';

  const ARTIFACTS = {
    'v142-model-picker':['Task criteria','Copilot / BYOK picker','Model + effort + context'],
    'v143-local-models':['Local-data constraint','On-device inference','Inspect tool/service routes'],
    'v142-byok-stateful':['Redacted provider config','statefulResponses: false','Full history in request'],
    'v143-compare-preview':['One prompt + criteria','Parallel model/harness runs','Human reviews each result'],
    'v144-fusion-ga':['Task + effort choice','Fusion selects route','Usage + billing detail'],
    'v144-comparisons-expanded':['Folderless prompt','Parallel isolated attempts','Compare before repo setup'],
    'visual-input-baseline':['Screenshot or PDF','Attach visual context','Inspect what was received'],
    'context-budget-baseline':['Overlong request','Context + /compact','Check answer criteria'],
    'provider-route-baseline':['Redacted settings','Provider / local route','Check access and policy'],
    'v140-multiroot-peer':['Related repositories','Open peer session','Review workspace'],
    'v140-remote-delegation':['Task + host needs','Discover / place session','Return host result'],
    'v140-devcontainer-cleanup':['Idle container session','Stop after configured idle','Restart when work resumes'],
    'v141-external-sessions':['CLI / Copilot app chat','Agents window surfaces it','Continue the conversation'],
    'v141-sandboxing':['File / network operation','Sandbox policy check','Observe allow / block'],
    'v142-canvases':['Structured shared artifact','Canvas beside chat','Inspect the same artifact'],
    'v142-move-chat':['Codex chat + folder','Move to worktree','History follows workspace'],
    'v143-large-chat':['Long Agent Host chat','Restore history in slices','Inspect responsiveness'],
    'v143-worktree-cleanup':['Inactive worktrees','Review size and activity','Cleanup or restore'],
    'v144-cloud-sessions':['Cloud task + conversation','GitHub-hosted session','Reopen; check workspace'],
    'v144-remote-environments':['Remote target','Check status and connect','Verify host + repository'],
    'baseline-host-state':['Remote session identity','Host retains session state','Reconnect and verify host'],
    'v140-peer-worktrees':['Two related tasks','Shared checkout or worktree','Check file isolation'],
    'v141-background-shells':['Long-running command','Background Shells pill','Inspect output / stop scope'],
    'v141-send-message':['Active turn + queue','Edit or cancel queued work','Started turn is immutable'],
    'v142-stop-shell':['Attached stale command','Stop selected shell','Other shells continue'],
    'v143-working-set':['Agent file edits','Keep or undo in editor','Inspect working tree'],
    'v143-discard-changes':['Branch / session changeset','Select discard scope','Preserve other edits'],
    'v144-assisted-permissions':['Folder-isolated tool call','LLM risk assessment','Auto-approve or confirm'],
    'v144-computer-use':['Local app action','Request per-action approval','Reject or stop; inspect state'],
    'baseline-isolation':['Task + reviewer owner','Choose shared or isolated','Inspect activity and diff'],
    'browser-scope-baseline':['Local page + browser','Share only intended tab','Inspect page evidence'],
    'screenshot-emulation':['Login page + viewport','Capture 390 × 844','Measure; runner status separate'],
    'element-feedback':['Selected page element','Comment + CSS proposal','Fresh screenshot + measure'],
    'tests-and-measurements':['Requested page behavior','Test + measurement + image','Keep each result distinct'],
    'diff-pr-evidence':['Proposed code change','Review checks + PR evidence','Human accept / hold / revise'],
    'check-recover':['Conflicting evidence','Hold / adjust / rerun','Revert or escalate if needed']
  };

  const captureLabel = (s) => {
    if (/unavailable/i.test(s.capture)) return 'CAPTURE UNAVAILABLE';
    if (/source media available|source media link|first-party table linked/i.test(s.capture)) return 'SOURCE MEDIA LINK';
    return 'CAPTURE NEEDED';
  };
  const releaseIdentity = (s) => s.version === '2026 announcement'
    ? `Copilot Vision · ${s.version}`
    : /^\d/.test(s.version)
      ? `VS Code ${s.version}`
      : `VS Code Copilot · ${s.version}`;
  const dateIdentity = (s) => s.published.toLowerCase().includes('cutoff')
    ? `baseline cutoff ${s.published.replace(/\s+cutoff$/i,'')}`
    : `published ${s.published}`;
  const proofBrief = (s) => {
    const text = s.proof.replace(/^First-party /,'').replace(/^Release-note /,'');
    const words = text.split(/\s+/);
    let out='';
    for (const word of words) {
      if (`${out} ${word}`.trim().length > 132) break;
      out = `${out} ${word}`.trim();
    }
    return out === text ? out : `${out}…`;
  };
  const featureScene = (s) => {
    const z=accent(s.part);
    const flow=ARTIFACTS[s.id] || ['Task input',s.featureName,'Inspect returned artifact'];
    let chipX=0;
    const makeChip=(label,tone,size)=>{
      const c=v.chip(chipX,8,label,{z:tone,size,h:30,r:5});
      chipX+=c.w+16;
      return c.markup;
    };
    const releaseChip = makeChip(`RELEASE · ${releaseIdentity(s)}`,z,15);
    const dateChip = s.published.toLowerCase().includes('cutoff')
      ? makeChip(`BASELINE CUTOFF · ${s.published.replace(/\s+cutoff$/i,'')}`,'local',15)
      : makeChip(`PUBLISHED · ${s.published}`,'local',15);
    const statusChip=makeChip(`STATUS · ${s.status}`,s.status==='GA'||s.status==='Stable'?'green':'orange',15);
    const captureChip=makeChip(captureLabel(s),/unavailable/i.test(s.capture)?'orange':'local',15);
    const pill=releaseChip+dateChip+statusChip+captureChip;
    const top =
      v.enter(box(0,54,410,154,'USE CASE',lines(16,111,s.useCase,34,'t-sm',23),z),0)+
      v.enter(box(430,54,520,154,'NEWLY POSSIBLE',lines(446,111,s.unlock,42,'t-sm',23),z),170)+
      v.enter(box(970,54,470,154,'REPRESENTATIVE PROOF · SCHEMATIC',
        lines(986,105,proofBrief(s),42,'t-sm',22),z),340);
    const boundary = v.g(
      v.rect(0,224,1440,72,{cls:'zone',r:8})+
      tx(18,250,'BOUNDARY / LIMITATION','t-xs t-mono z-text')+
        lines(280,250,s.limitation,110,'t-sm',24),
      {cls:'z-orange'});
    const xs=[0,510,1020], w=420, y=342;
    const nodes=flow.map((label,i)=>v.enter(
      v.g(v.rect(xs[i],y,w,78,{cls:'box',r:9})+
        tx(xs[i]+18,y+25,['INPUT / ACTOR','FEATURE ACTION','OBSERVABLE CHECK'][i],'t-xs t-mono z-text')+
        lines(xs[i]+18,y+57,label,37,'t-sm',22),{cls:`z-${i===2?'green':i===1?z:'local'}`}),
      570+i*250)).join('');
    const arrows=arrow(430,381,500,z,900)+arrow(940,381,1010,'green',1250);
    const label=`${s.featureName}. ${releaseIdentity(s)}; ${dateIdentity(s)}; status ${s.status}. Use case: ${s.useCase} New action: ${s.unlock} Proof plan: ${s.proof} Limitation: ${s.limitation} ${captureLabel(s)}.`;
    return html.head(s)+v.scene(1440,442,label,pill+top+boundary+arrows+nodes,'vl-scene')+
      html.footnote('Illustrative schematic · source linked in notes · no observed result claimed.');
  };

  SC['title-map'] = (s) => {
    const zones=[
      ['01 / ANSWER','Task → route → inspected output','purple'],
      ['02 / CONTINUITY','Session → workspace → reconnect','remote'],
      ['03 / EXECUTION','Isolation → permission → acceptance','orange'],
      ['04 / EVIDENCE','Behavior → test → reviewed change','green']
    ];
    const tiles=zones.map((a,i)=>{
      const x=(i%2)*380,y=100+Math.floor(i/2)*210;
      return v.enter(v.g(
        v.rect(x,y,350,160,{cls:'box vl-window',r:12})+
        tx(x+18,y+27,a[0],'t-xs t-mono z-text')+
        v.path(`M${x+18} ${y+38}h314`,{cls:'wire z-stroke'})+
        lines(x+20,y+82,a[1],29,'t-sm',27)+
        tx(x+20,y+137,['1.142–1.144 + baseline','1.140–1.144 + baseline','1.140–1.144 + baseline','Baseline workflow'][i],'t-xs t-mono t-muted'),
        {cls:`z-${a[2]}`}),i*220);
    }).join('');
    return v.scene(760,600,'Four independent practitioner outcomes cover dated VS Code releases 1.140 through 1.144, plus explicitly labeled baseline workflows.',
      tx(0,32,'VS CODE COPILOT / FOUR PRACTITIONER OUTCOMES','t-xs t-mono')+
      tiles+
      v.g(v.path('M0 494h730',{cls:'wire'})+
        tx(0,540,'36 feature cards · each carries its own use case, proof, and limit.','t-sm')+
        tx(0,580,'Release status is visible; no missing screenshot is represented as live UI.','t-sm t-muted'),
        {cls:'z-purple'}),'vl-scene');
  };
  SC['closing-map'] = () => v.scene(760,470,
    'Transfer: name the task, execution boundary, proof, and human reviewer in one real repository.',
    tx(0,35,'TAKE ONE BOUNDED TASK INTO YOUR REPOSITORY','t-xs t-mono')+
    [
      ['TASK','State the acceptance criteria.','purple'],
      ['BOUNDARY','Name context, host, and access.','orange'],
      ['PROOF','Capture behavior and inspect artifacts.','green'],
      ['OWNER','Choose who accepts or redirects.','remote']
    ].map((x,i)=>{
      const y=70+i*94;
      return v.enter(v.g(
        v.rect(0,y,730,72,{cls:'box vl-window',r:8})+
        tx(18,y+28,x[0],'t-xs t-mono z-text')+
        tx(180,y+45,x[1],'t-sm'),
        {cls:`z-${x[2]}`}),i*180);
    }).join('')+
    v.path('M0 460h730',{cls:'wire'}),'vl-scene');
  SC['contents-vl'] = (s) => {
    const tones=['purple','remote','orange','green'];
    const cards=s.sections.map((sec,i)=>{
      const x=(i%2)*720,y=24+Math.floor(i/2)*244,z=tones[i];
      return `<a href="#${sec.slide}" aria-label="Go to ${esc(sec.title)}">`+
        v.enter(v.g(
          v.rect(x,y,690,214,{cls:'box vl-window',r:12})+
          v.path(`M${x+24} ${y+44}h640`,{cls:'wire z-stroke'})+
          tx(x+24,y+31,`PART 0${i+1} · OPENER SLIDE ${sec.slide}`,'t-xs t-mono z-text')+
          lines(x+24,y+91,sec.title,34,'t-lg',34)+
          tx(x+24,y+164,sec.subtitle,'t-sm t-muted')+
          lines(x+24,y+194,sec.blurb,68,'t-xs',18),
          {cls:`z-${z}`}),250+i*220)+'</a>';
    }).join('');
    const label=`Four parts: ${s.sections.map((x,i)=>`Part ${i+1}, ${x.title}; opens at slide ${x.slide}`).join('. ')}.`;
    return html.head(s)+v.scene(1440,520,label,cards,'vl-scene');
  };
  SC['feature-card']=featureScene;

  window.SCENES=SC;
})();
