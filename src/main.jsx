import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './pingmianScoped.css'
import '../pingmian-site/src/reel.css'
import { VisualPortfolio } from '../pingmian-site/src/main.jsx'

const asset = path => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const projects = [
  { id:'01', name:'KS EVO', cn:'\u8d5b\u8f66\u6a21\u62df\u5668\u6982\u5ff5\u8bbe\u8ba1', type:'SIM RACING / HMI', year:'2026', image:asset('/visual/project-ks-evo.png'), pages:[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], color:'#ff5435', note:'\u5c06\u89e6\u63a7\u3001\u663e\u793a\u4e0e\u4eba\u673a\u5de5\u5b66\u63a7\u5236\u533a\u6574\u5408\u8fdb\u4e13\u4e1a\u8d5b\u8f66\u65b9\u5411\u76d8\uff0c\u5728\u9ad8\u901f\u72b6\u6001\u4e0b\u4fdd\u6301\u4fe1\u606f\u4e0e\u64cd\u4f5c\u6e05\u6670\u3002', tags:['RESEARCH','ERGONOMICS','CMF'] },
  { id:'02', name:'ASAR', cn:'\u9632\u6655\u0020\u0041\u0052\u0020\u773c\u955c', type:'WEARABLE / HEALTH', year:'2025', image:asset('/visual/asar-original.jpg'), pages:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34], color:'#98a99f', note:'\u4ee5\u89c6\u89c9\u8865\u507f\u3001\u524d\u5ead\u8c03\u8282\u4e0e\u55c5\u89c9\u5e72\u9884\u5efa\u7acb\u591a\u611f\u5b98\u534f\u540c\u4f53\u9a8c\uff0c\u8ba9\u9ad8\u9891\u51fa\u884c\u56de\u5f52\u8212\u9002\u3002', tags:['INSIGHT','WEARABLE','TECH'] },
  { id:'03', name:'VCRE', cn:'\u810a\u67f1\u77eb\u6b63\u5eb7\u590d\u5916\u9aa8\u9abc', type:'MEDICAL / EXOSKELETON', year:'2025', image:asset('/visual/project-vcre.png'), pages:[35,36,37,38,39,40,41,42], color:'#5b6b78', note:'\u5728\u533b\u7597\u7ea7\u77eb\u6b63\u4e0e\u65e5\u5e38\u5316\u5eb7\u590d\u4e4b\u95f4\u5bfb\u627e\u5e73\u8861\uff0c\u7528\u6a21\u5757\u5316\u652f\u6491\u56de\u5e94\u771f\u5b9e\u7a7f\u6234\u4e0e\u5eb7\u590d\u573a\u666f\u3002', tags:['MEDICAL','MODULAR','HUMAN FACTOR'] },
  { id:'04', name:'ALECS', cn:'\u65e0\u4eba\u6708\u8868\u52d8\u63a2\u91c7\u96c6\u8f66', type:'MOBILITY / SPACE', year:'2025', image:asset('/visual/project-alecs.webp'), pages:[43,44,45,46,47,48,49,50,51,52], color:'#b9b9b2', note:'\u9762\u5411\u6708\u8868\u8d44\u6e90\u63a2\u6d4b\u4e0e\u91c7\u6837\u4efb\u52a1\uff0c\u7528\u9ad8\u673a\u52a8\u60ac\u67b6\u3001\u611f\u77e5\u5355\u5143\u548c\u673a\u68b0\u81c2\u6784\u6210\u5b8c\u6574\u4efb\u52a1\u95ed\u73af\u3002', tags:['MOBILITY','SYSTEM','SPACE'] }
]
const pageSrc = number => asset('/portfolio/pages/p-' + String(number).padStart(2,'0') + '.jpg')
const archivePages = [54,55,56,57,58,59,60]
const archiveLabels = ['\u5f55\u53d6\u901a\u77e5\u4e66\u8bbe\u8ba1','\u54c1\u724c\u6807\u5fd7\u8bbe\u8ba1','\u5e7f\u544a\u89c6\u89c9\u8bbe\u8ba1','\u673a\u68b0\u81c2\u9020\u578b\u8bbe\u8ba1','\u4ea7\u54c1\u6e32\u67d3\u7ec3\u4e60','\u6982\u5ff5\u8f66\u8bbe\u8ba1','\u624b\u7ed8\u7ec3\u4e60']
const stripPages = Array.from({length:61},(_,index)=>index+1)
const indexProjects = [
  ...projects.map((project,index)=>({...project,indexImage:['/visual/index-ks.png','/visual/index-asar.png','/visual/index-vcre.png','/visual/index-alecs.png'].map(asset)[index],target:'#case-' + project.id})),
  {id:'05',name:'GRAPHIC & ARCHIVE',cn:'\u5e73\u9762\u8bbe\u8ba1\u4e0e\u4f5c\u54c1\u5408\u96c6',type:'VISUAL / ARCHIVE',indexImage:asset('/visual/index-archive.png'),target:'#archive'}
]
const awardItems = ['\u5165\u56f4\u0020\u0032\u0030\u0032\u0036\u0020\u5fb7\u56fd\u0020\u0069\u0046\u0020\u8bbe\u8ba1\u5956','\u7f8e\u56fd\u0020\u004d\u0055\u0053\u0045\u0020\u8bbe\u8ba1\u5956\u94f6\u5956\u0020\u00d7\u0032','\u7f8e\u56fd\u0020\u004d\u0075\u0073\u0065\u0020\u8bbe\u8ba1\u94dc\u5956','\u004d\u0053\u0049\u0020\u5fae\u661f\u79d1\u6280\u521b\u4f5c\u5927\u8d5b\u4f18\u79c0\u5956','\u5165\u56f4\u0020\u0051\u0051\u0020\u97f3\u4e50\u8f66\u8f7d\u97f3\u4e50\u63a7\u4ef6\u5927\u8d5b','\u4e2d\u56fd\u597d\u521b\u610f\u8bbe\u8ba1\u5927\u8d5b\u7701\u7ea7\u5956\u9879','\u672a\u6765\u8bbe\u8ba1\u5e08\u5927\u8d5b\u7701\u7ea7\u5956\u9879','\u5168\u56fd\u5927\u5b66\u751f\u5de5\u4e1a\u8bbe\u8ba1\u5927\u8d5b\u7701\u7ea7\u5956\u9879','\u4e0a\u6d77\u5e7f\u544a\u0020\u0043\u004d\u0042\u0041\u0020\u521b\u610f\u5956','\u4e24\u5cb8\u65b0\u9510\u8bbe\u8ba1\u7ade\u8d5b\u5956\u9879','\u534e\u590f\u5956\u6587\u5316\u827a\u672f\u8bbe\u8ba1\u5927\u8d5b\u5956\u9879','\u0053\u0047\u0041\u0044\u0043\u0020\u65b0\u52a0\u5761\u91d1\u6d77\u827a\u672f\u8bbe\u8ba1\u5927\u5956','\u5927\u5b66\u751f\u89c6\u89c9\u827a\u672f\u8bbe\u8ba1\u5927\u8d5b\u5956\u9879','\u897f\u5b89\u5de5\u4e1a\u5927\u5b66\u5f55\u53d6\u901a\u77e5\u4e66\u8bbe\u8ba1\u5927\u8d5b\u4e00\u7b49\u5956']
const toolItems = [
  {name:'Photoshop',icon:asset('/tools/photoshop.svg')},{name:'Illustrator',icon:asset('/tools/illustrator.svg')},{name:'KeyShot',icon:asset('/tools/keyshot.png')},
  {name:'Rhino',icon:asset('/tools/rhino.svg')},{name:'SD ComfyUI',icon:asset('/tools/comfyui.svg')},{name:'Premiere Pro',icon:asset('/tools/premiere.svg')},
  {name:'After Effects',icon:asset('/tools/after-effects.svg')},{name:'SolidWorks',icon:asset('/tools/solidworks.png')},{name:'Figma',icon:asset('/tools/figma.svg')}
]
const Arrow = () => <span className="arrow" aria-hidden="true">\u2192</span>
function AutoFolioStrip(){
  const trackRef = useRef(null)
  const targetSpeed = useRef(.34)
  const [visiblePages, setVisiblePages] = useState(stripPages.slice(0,12))

  useEffect(()=>{
    const revealAll = () => setVisiblePages(stripPages)
    if('requestIdleCallback' in window){
      const idleId = window.requestIdleCallback(revealAll,{timeout:1800})
      return () => window.cancelIdleCallback(idleId)
    }
    const timer = window.setTimeout(revealAll,900)
    return () => window.clearTimeout(timer)
  },[])

  useEffect(()=>{
    const track = trackRef.current
    if(!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const compact = window.matchMedia('(max-width: 720px)').matches
    targetSpeed.current = compact ? .14 : .34
    let frame
    let x = 0
    let speed = .34
    let previous = performance.now()
    const tick = now => {
      const delta = Math.min(now-previous,40)
      previous = now
      speed += (targetSpeed.current-speed)*.035
      x -= speed*delta
      const loopWidth = track.scrollWidth/2
      if(loopWidth && -x>=loopWidth) x += loopWidth
      track.style.transform = `translate3d(${x}px,0,0)`
      track.dataset.speed = speed.toFixed(3)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return ()=>cancelAnimationFrame(frame)
  },[])

  return <section className="folioStrip" aria-label="作品集横向浏览">
    <div className="folioStripHead shell" data-reveal>
      <div><span>03.5 / PORTFOLIO FILMSTRIP</span><b>AUTO SCROLL · HOVER TO SLOW</b></div>
      <output>01 / 61</output>
    </div>
    <div className="folioViewport" data-reveal onPointerEnter={()=>{targetSpeed.current=.075}} onPointerLeave={()=>{targetSpeed.current=window.matchMedia('(max-width: 720px)').matches?.14:.34}}>
      <div className="folioTrack" ref={trackRef}>
        {[...visiblePages,...visiblePages].map((page,index)=><figure key={`${page}-${index}`} aria-hidden={index>=visiblePages.length}>
          <img src={pageSrc(page)} loading={index<6?'eager':'lazy'} decoding="async" alt={index<visiblePages.length?`作品集第 ${page} 页`:''}/><figcaption>{String(page).padStart(2,'0')}</figcaption>
        </figure>)}
      </div>
    </div>
  </section>
}


const visualStoryItems = [
  { index:'01', title:'CITY OF SUNSET', cn:'落日之城', type:'HMI / VISUAL SKIN', image:'/assets/1753710162169-5412196677.webp', detail:'沉浸式载车音乐界面与落日视觉叙事' },
  { index:'02', title:'MSI BRAND CAMPAIGN', cn:'微星品牌视觉', type:'CAMPAIGN / KEY VISUAL', image:'/assets/C3BAA1AC62D649FC89D7B3C67DFC8529-6-2.webp', detail:'高性能设备的龙魂品牌视觉提案' },
  { index:'03', title:'PAPER NARRATIVE', cn:'录取通知书', type:'EDITORIAL / PACKAGING', image:'/assets/20260714-113007.webp', detail:'用纸张、结构与开启动作编排一段入学叙事' },
  { index:'04', title:'GARMENT SHADOW', cn:'衣影', type:'CONCEPT / LIGHTING', image:'/assets/20260714-113121.webp', detail:'从衣物与光影之间提取氛围灯概念' },
  { index:'05', title:'DANYANG IDENTITY', cn:'丹阳文旅', type:'BRAND IDENTITY / LOGO', image:'/assets/20260714-113102.webp', detail:'从地域山水与历史中提取城市印章' }
]

function VisualStoriesBridge(){
  const [entered,setEntered] = useState(false)
  const mountRef = useRef(null)

  useEffect(()=>{
    const observer = new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){
        setEntered(true)
        observer.disconnect()
      }
    },{rootMargin:'2000px 0px'})
    if(mountRef.current) observer.observe(mountRef.current)
    return ()=>observer.disconnect()
  },[])

  return <section ref={mountRef} className="visualBridgeMount" id="archive" aria-label="Visual design portfolio">{entered&&<VisualPortfolio />}</section>
}


function SiteRail(){
  const [active,setActive] = useState('top')
  const links = [
    ['00','#top','首页'],
    ['01','#about','关于'],
    ['02','#work','工业设计'],
    ['03','#archive','视觉作品'],
    ['04','#contact','联系']
  ]
  useEffect(()=>{
    const observer = new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0]
      if(visible) setActive(visible.target.id)
    },{rootMargin:'-35% 0px -55% 0px',threshold:[0,.2,.5]})
    links.forEach(([,id])=>{const el=document.querySelector(id);if(el) observer.observe(el)})
    return ()=>observer.disconnect()
  },[])
  return <nav className={active==="work"?"siteRail isWork":"siteRail"} aria-label="网站目录">
    {links.map(([index,id,label])=><button key={id} className={active===id.slice(1)?'active':''} onClick={()=>document.querySelector(id)?.scrollIntoView({behavior:'smooth'})}>
      <span>{index}</span><i></i><b>{label}</b>
    </button>)}
  </nav>
}
function App(){
  const [active,setActive] = useState(null)
  const [menu,setMenu] = useState(false)
  const [showTop,setShowTop] = useState(false)
  const [contactCard,setContactCard] = useState(false)
  const [openStat,setOpenStat] = useState(null)

  useEffect(()=>{
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('in')
    }),{threshold:.12})
    document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el))
    const move = e => {
      document.documentElement.style.setProperty('--mx',`${e.clientX}px`)
      document.documentElement.style.setProperty('--my',`${e.clientY}px`)
      const x = (e.clientX / window.innerWidth - .5) * 2
      const y = (e.clientY / window.innerHeight - .5) * 2
      document.documentElement.style.setProperty('--hero-x',`${x * 26}px`)
      document.documentElement.style.setProperty('--hero-y',`${y * 18}px`)
      document.documentElement.style.setProperty('--hero-image-x',`${x * -12}px`)
      document.documentElement.style.setProperty('--hero-image-y',`${y * -8}px`)
    }
    const syncScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scrollProgress',`${max > 0 ? (window.scrollY / max) * 100 : 0}%`)
      setShowTop(window.scrollY > window.innerHeight * .8)
    }
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if(!coarsePointer) window.addEventListener('pointermove',move)
    window.addEventListener('scroll',syncScroll,{passive:true})
    syncScroll()
    return ()=>{ observer.disconnect(); if(!coarsePointer) window.removeEventListener('pointermove',move); window.removeEventListener('scroll',syncScroll) }
  },[])

  useEffect(()=>{
    document.body.style.overflow = active || contactCard ? 'hidden' : ''
    return ()=>{ document.body.style.overflow='' }
  },[active,contactCard])

  useEffect(()=>{
    const closeOnEscape=event=>{
      if(event.key==='Escape'){
        setContactCard(false)
        setOpenStat(null)
      }
    }
    window.addEventListener('keydown',closeOnEscape)
    return ()=>window.removeEventListener('keydown',closeOnEscape)
  },[])

  const go = id => { document.querySelector(id)?.scrollIntoView({behavior:'smooth'}); setMenu(false) }

  return <main>
    <div className="scrollProgress" aria-hidden="true"/>
    <div className="cursorGlow" aria-hidden="true"/>
    <div className="cinemaBoot" aria-hidden="true">
      <div className="cinemaBootGrid"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
      <div className="cinemaBootText">
        <span>GJL DESIGN ARCHIVE / SYSTEM START</span>
        <b>DESIGNING<br/>THE UNSEEN.</b>
        <span>FORM · FUNCTION · EXPERIENCE</span>
      </div>
    </div>
    <button className={showTop?'floatingTop isVisible':'floatingTop'} onClick={()=>go('#top')} aria-label="返回顶部"><span>↑</span><small>TOP</small></button>
    <SiteRail />
    <header className="topbar shell">
      <button className="logo" onClick={()=>setContactCard(true)} aria-label="查看谷嘉乐的联系方式"><b>GJL</b><span>谷嘉乐<br/>INDUSTRIAL DESIGNER</span></button>
      <nav className={menu?'nav open':'nav'}>
        <button onClick={()=>go('#work')}><span>WORK</span><small>作品</small></button>
        <button onClick={()=>go('#about')}><span>ABOUT</span><small>关于</small></button>
        <button onClick={()=>go('#contact')}><span>CONTACT</span><small>联系</small></button>
      </nav>
      <div className="navSide"><span><i/> AVAILABLE · 2026</span><a className="visualSwitch" href="https://www.gujiale.cn" target="_blank" rel="noreferrer">切换视觉设计作品集</a><button className="menu" onClick={()=>setMenu(!menu)}>{menu?'CLOSE':'MENU'}</button></div>
    </header>

    <section className="hero" id="top">
      <div className="heroNoise" aria-hidden="true"/>
      <div className="heroAura" aria-hidden="true"/>
      <div className="coverFrame" aria-hidden="true">
        <img src={asset('/visual/cover-original.jpg')} alt=""/>
        <div className="lightSweep"/>
      </div>
      <div className="heroMeta shell"><span>PORTFOLIO / 2026<small>谷嘉乐的个人设计小站</small></span><span>PRODUCT · FORM · EXPERIENCE</span></div>
      <div className="heroTitle shell">
        <p>产品设计不是描摹未来，<br/>而是让未知拥有形状。</p>
        <h1><span>DESIGNING</span><strong>THE UNSEEN<em>.</em></strong></h1>
      </div>
      <div className="heroFoot shell"><span>GU JIALE / 谷嘉乐</span><button onClick={()=>go('#about')}>SCROLL TO EXPLORE <b>↓</b></button><span>XI'AN · CN</span></div>
    </section>

    <section className="about shell" id="about">
      <div className="sectionCode" data-reveal><span>02</span> / PROFILE</div>
      <div className="aboutGrid">
        <div className="aboutImage" data-reveal>
          <img src={asset('/portfolio/portrait-20260703.png')} alt="谷嘉乐个人肖像"/>
          <div className="portraitType" aria-hidden="true">
            <span className="portraitMark">GJL / ID DESIGNER</span>
            <span className="portraitPlace">XI'AN · CN</span>
            <span className="portraitYear">2026</span>
          </div>
        </div>
        <div className="aboutBody" data-reveal>
          <p className="micro">PRODUCT ID DESIGNER · XI'AN</p>
          <h2>让产品不仅<br/>被看见，更被<strong>感知。</strong></h2>
          <p className="aboutIntro">西安工业大学产品设计专业。关注智能硬件、未来出行与医疗健康，擅长从场景洞察、造型推导到建模渲染的完整设计表达。</p>
          <div className="career">
            <div className="careerItem" tabIndex="0"><time>2026.06—至今</time><p>传音控股<span>工业设计实习</span></p><i>+</i><aside className="careerPopover"><small>PROJECT EXPERIENCE / 项目经历</small><ul><li>系列手机衍生配件设计</li></ul></aside></div>
            <div className="careerItem" tabIndex="0"><time>2026.01—04</time><p>北京洛可可科技有限公司<span>ID 设计 / 建模渲染</span></p><i>+</i><aside className="careerPopover"><small>PROJECT EXPERIENCE / 项目经历</small><ul><li>尚宏仪表智能双模水表创新设计</li><li>米奥充电机器人外观设计</li><li>联宠 C09 / C10 智能猫砂盆外观及机构推导</li><li>沐岚香薰产品设计</li><li>SAZA 男士香氛全案设计与落地</li><li>碧水源智能模块化水厂设计</li></ul></aside></div>
            <div className="careerItem" tabIndex="0"><time>2024—2025</time><p>西安工业大学兵器装备工业设计中心<span>项目设计成员</span></p><i>+</i><aside className="careerPopover"><small>PROJECT EXPERIENCE / 项目经历</small><ul><li>新疆文创 LOGO 全案设计</li><li>XX 型远程多管火箭炮设计</li><li>XX 型指挥车设计</li><li>氢氧焰烧蚀平台合作项目</li><li>西安工业大学录取通知书设计与落地</li></ul></aside></div>
          </div>
        </div>
      </div>
      <div className="numbers" data-reveal>
        <div className={`statCard statAwards${openStat==='awards'?' isOpen':''}`} tabIndex="0" role="button" aria-expanded={openStat==='awards'} onClick={()=>setOpenStat(openStat==='awards'?null:'awards')} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setOpenStat(openStat==='awards'?null:'awards')}}}><b>20<sup>+</sup></b><span className="statLabel"><strong>设计奖项</strong><small>DESIGN AWARDS</small></span><i>CLICK TO EXPLORE</i>
          <aside className="statPopover awardsPopover"><header><small>AWARD EXPERIENCE</small><strong>所获奖项</strong></header><ol>{awardItems.map((award,index)=><li key={award}><em>{String(index+1).padStart(2,'0')}</em><span>{award}</span></li>)}</ol></aside>
        </div>
        <div className={`statCard statProjects${openStat==='projects'?' isOpen':''}`} tabIndex="0" role="button" aria-expanded={openStat==='projects'} onClick={event=>{if(!event.target.closest('button'))setOpenStat(openStat==='projects'?null:'projects')}} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setOpenStat(openStat==='projects'?null:'projects')}}}><b>04</b><span className="statLabel"><strong>核心项目</strong><small>CORE PROJECTS</small></span><i>CLICK TO EXPLORE</i>
          <aside className="statPopover projectsPopover"><header><small>SELECTED PROJECTS</small><strong>核心项目 · 04</strong></header><div className="statProjectList">{projects.map(project=><button key={project.id} onClick={()=>go(`#case-${project.id}`)}><em>{project.id}</em><span><b>{project.name}</b><small>{project.cn}</small></span><Arrow/></button>)}</div></aside>
        </div>
        <div className={`statCard statTools${openStat==='tools'?' isOpen':''}`} tabIndex="0" role="button" aria-expanded={openStat==='tools'} onClick={()=>setOpenStat(openStat==='tools'?null:'tools')} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setOpenStat(openStat==='tools'?null:'tools')}}}><b>09<sup>+</sup></b><span className="statLabel"><strong>设计工具</strong><small>DESIGN TOOLS</small></span><i>CLICK TO EXPLORE</i>
          <aside className="statPopover toolsPopover"><header><small>DESIGN WORKFLOW</small><strong>工具矩阵 · 09</strong></header><div className="toolGrid">{toolItems.map(tool=><div key={tool.name}><span className="toolIcon"><img src={tool.icon} alt={`${tool.name} 软件图标`}/></span><b>{tool.name}</b></div>)}</div></aside>
        </div>
      </div>
    {openStat==='awards'&&<div className="statModalLayer" role="presentation" onClick={()=>setOpenStat(null)}>
      <div className="statModal" role="dialog" aria-modal="true" aria-labelledby="awards-modal-title" onClick={event=>event.stopPropagation()}>
        <button className="statModalClose" onClick={()=>setOpenStat(null)} aria-label="关闭奖项列表">?</button>
        <header><small>AWARD EXPERIENCE</small><strong id="awards-modal-title">所获奖项</strong></header>
        <ol>{awardItems.map((award,index)=><li key={award}><em>{String(index+1).padStart(2,'0')}</em><span>{award}</span></li>)}</ol>
      </div>
    </div>}
    </section>

    <section className="portfolioIndex shell" id="index">
      <div className="indexTop" data-reveal><div className="sectionCode"><span>03</span> / CONTENTS</div><p>PORTFOLIO INDEX<br/>作品目录</p></div>
      <div className="indexVisual" data-reveal>
        <div className="indexGallery">
          {indexProjects.map(project=><button className="indexCard" key={project.id} onClick={()=>go(project.target)} onPointerMove={event=>{
            const rect=event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--index-x',`${event.clientX-rect.left}px`)
            event.currentTarget.style.setProperty('--index-y',`${event.clientY-rect.top}px`)
          }} aria-label={`前往 ${project.name} 项目`}>
            <span className="indexNumber">{project.id}</span>
            <img src={project.indexImage} alt=""/>
            <span className="indexShade" aria-hidden="true"/>
            <span className="indexCursor" aria-hidden="true">OPEN</span>
            <span className="indexLabel"><small>{project.type}</small><b>{project.name}</b><em>{project.cn}</em></span>
            <Arrow/>
          </button>)}
        </div>
      </div>
    </section>

    <AutoFolioStrip/>

    <div className="ticker tickerReverse" aria-hidden="true"><div>RESEARCH · IDEATION · FORM · PROTOTYPE · CMF · EXPERIENCE · RESEARCH · IDEATION · FORM · PROTOTYPE · CMF · EXPERIENCE ·</div></div>

    <section className="work" id="work">
      <div className="workHead shell" data-reveal>
        <div className="sectionCode"><span>04</span> / SELECTED WORK</div>
        <h2>SELECTED<br/><i>OBJECTS</i><sup>04</sup></h2>
        <p>2024—2026<br/>PRODUCT / ID / CONCEPT</p>
      </div>
      <div className="projects">
        {projects.map(project=><article className={`project project--${project.id}`} id={`case-${project.id}`} key={project.id} style={{'--accent':project.color}} data-reveal>
          <button className="projectMedia" onPointerMove={event=>{
            const rect = event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--card-x',`${event.clientX-rect.left}px`)
            event.currentTarget.style.setProperty('--card-y',`${event.clientY-rect.top}px`)
          }} onClick={()=>setActive(project)} aria-label={`查看 ${project.name} 项目`}>
            <img src={project.image} alt={project.cn}/><span className="projectTint"/>
            <span className="projectNo">{project.id}</span><span className="projectCursor" aria-hidden="true">VIEW</span><span className="projectAction">VIEW PROJECT <Arrow/></span>
          </button>
          <div className="projectLine shell">
            <div><span>{project.type}</span><span>{project.year}</span></div>
            <h3>{project.name}</h3>
            <div className="projectText"><b>{project.cn}</b><p>{project.note}</p></div>
          </div>
        </article>)}
      </div>
    </section>

    <VisualStoriesBridge />

    <div className="ticker" aria-hidden="true"><div>INDUSTRIAL DESIGN · HUMAN EXPERIENCE · FUTURE OBJECTS · INDUSTRIAL DESIGN · HUMAN EXPERIENCE · FUTURE OBJECTS ·</div></div>

    <section className="contact" id="contact">
      <div className="contactLight"/>
      <div className="shell contactInner" data-reveal>
        <div className="sectionCode"><span>06</span> / CONTACT</div>
        <p>HAVE AN IDEA?</p>
        <h2>LET'S MAKE IT<br/><i>VISIBLE.</i></h2>
        <a href="mailto:2735901862@qq.com">START A CONVERSATION <Arrow/></a>
        <div className="contactMeta"><span>2735901862@qq.com</span><span>WECHAT / Gjl2735901862</span><span>155 9178 6656</span><button onClick={()=>go('#top')}>BACK TO TOP ↑</button></div>
      </div>
    </section>

    {contactCard&&<div className="contactCardLayer" role="presentation" onClick={event=>{if(event.target===event.currentTarget)setContactCard(false)}}>
      <section className="contactCard" role="dialog" aria-modal="true" aria-labelledby="contact-card-title">
        <button className="contactCardClose" onClick={()=>setContactCard(false)} aria-label="关闭联系方式">×</button>
        <div className="contactCardCode">GJL / CONTACT</div>
        <h2 id="contact-card-title">LET'S<br/><i>CONNECT.</i></h2>
        <div className="contactCardRows">
          <a href="tel:15591786656"><span>PHONE</span><b>155 9178 6656</b><Arrow/></a>
          <a href="mailto:2735901862@qq.com"><span>EMAIL</span><b>2735901862@qq.com</b><Arrow/></a>
          <p><span>WECHAT</span><b>Gjl2735901862</b></p>
        </div>
      </section>
    </div>}

    {active&&<div className="modal" role="dialog" aria-modal="true" aria-label={`${active.name} 项目详情`}>
      <button className="modalClose" onClick={()=>setActive(null)}>CLOSE <span>×</span></button>
      <div className="modalHead shell"><div><span>{active.id} / CASE STUDY</span><h2>{active.name}</h2></div><p>{active.cn}<br/><small>{active.type} · {active.year}</small></p></div>
      <div className="modalInfo shell"><p>{active.note}</p><div>{active.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>
      <div className="casePages shell">{active.pages.map((page,index)=><figure className={index===0||index%5===0?'caseWide':''} key={page}><img src={pageSrc(page)} alt={`${active.cn} - 作品集第 ${page} 页`}/><figcaption>{String(page).padStart(2,'0')} / {String(active.pages.at(-1)).padStart(2,'0')}</figcaption></figure>)}</div>
    </div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App/>)

