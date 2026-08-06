import React, { useEffect, useMemo, useRef, useState } from 'react'

const A = '/assets/'

const chapters = [
  { id: 'music', index: '01', label: 'DIGITAL SUNSET', cn: '落日之城', theme: 'sunset' },
  { id: 'msi', index: '02', label: 'MSI BRAND CAMPAIGN', cn: '微星品牌视觉', theme: 'red' },
  { id: 'admission', index: '03', label: 'PAPER NARRATIVE', cn: '录取通知书', theme: 'paper' },
  { id: 'lamp', index: '04', label: 'OBJECT & LIGHT', cn: '衣影', theme: 'ember' },
  { id: 'danyang', index: '05', label: 'PLACE IDENTITY', cn: '丹阳文旅', theme: 'jade' },
]

const projects = {
  music: {
    title: '落日之城', en: 'CITY OF SUNSET', year: '2025', type: 'HMI / VISUAL SKIN',
    desc: '为 QQ 音乐车载皮肤创作大赛设计的沉浸式音乐界面。城市天际线、落日光晕与唱片交互被组织为同一段驾驶叙事，让音乐界面成为路途中的情绪风景。',
    images: ['1753710162169-5412196677.webp'],
    brand: 'qq'
  },
  msi: {
    title: '微星品牌视觉', en: 'MSI BRAND CAMPAIGN', year: '2025', type: 'CAMPAIGN / KEY VISUAL',
    desc: '围绕 MSI 微星科技的高性能设备与龙魂品牌基因，构建“身临其境、契约力量、真实视界”三组视觉提案。产品不再只是画面中的设备，而成为进入幻想世界的媒介。',
    images: ['C3BAA1AC62D649FC89D7B3C67DFC8529-6-2.webp', 'EC0C99F7E36E4629A2F13D3C3B025FC1-6-2.webp', '836E512199C84C76B760B75F521DAD26-6-2.webp'],
    brand: 'msi'
  },
  lamp: {
    title: '衣影', en: 'GARMENT SHADOW', year: '2025', type: 'CONCEPT / LIGHTING',
    desc: '把衣帽架转化为一盏记录生活痕迹的氛围灯。衣物不再只是被收纳的物件，而成为光的滤镜：材质、颜色与褶皱共同塑造每天不同的室内表情。',
    images: ['20260714-113121.webp', '20260714-113126.webp']
  },
  danyang: {
    title: '丹阳文旅', en: 'DANYANG CULTURAL TOURISM', year: '2025', type: 'BRAND IDENTITY / LOGO',
    desc: '从丹阳的山、水、桥与历史建筑中提取共同轮廓，将地域记忆压缩成一个可识别、可延展的城市印章。视觉从自然地貌出发，落在公共传播场景。',
    images: ['20260714-113102.webp', '20260714-113040.webp', '20260714-113051.webp', '20260714-113056.webp']
  }
}

function BrandLockup({ brand }) {
  if (brand === 'qq') return <div className="brandLockup qqBrand" aria-label="QQ音乐品牌信息">
    <b>Q Music <em>Ideas</em></b>
    <span>QQ音乐 · 车载皮肤设计大赛</span>
  </div>
  if (brand === 'msi') return <div className="brandLockup msiBrand" aria-label="MSI微星品牌信息">
    <b>msi</b>
    <span>MICRO-STAR INTERNATIONAL<br />龙魂创意设计</span>
  </div>
  return null
}

function Meta({ project }) {
  return <div className="projectMeta">
    <span>{project.year}</span><span>{project.type}</span><span>GJL / VISUAL PRACTICE</span>
  </div>
}

function ProjectChapter({ id, chapter, project, layout = 'editorial', onImage, children }) {
  return <section id={id} className={'chapter projectChapter ' + layout} data-theme={chapter.theme}>
    <div className="chapterHeading reveal">
      <p className="eyebrow">{chapter.index} / {chapter.label}</p>
      <BrandLockup brand={project.brand} />
      <div className="titleRow">
        <h2>{project.title}</h2>
        <p>{project.en}</p>
      </div>
      <Meta project={project} />
    </div>
    <div className="storyGrid">
      <div className="storyCopy reveal">
        <p className="lead">{project.desc}</p>
        <div className="ruleText"><span>ROLE</span><b>视觉概念 / 版式 / 场景表达</b></div>
        <div className="ruleText"><span>NARRATIVE</span><b>从品牌语境进入场景，再抵达体验</b></div>
      </div>
      <div className="gallery">
        {project.images.map((img, i) => <button className={'imageFrame reveal image-' + (i + 1)} key={img} onClick={() => onImage(img, project.title + ' ' + (i + 1))} aria-label={'查看' + project.title + '作品图 ' + (i + 1)}>
          <img src={A + img} alt={project.title + '作品展示 ' + (i + 1)} loading={id === 'music' && i === 0 ? 'eager' : 'lazy'} />
          <span>{String(i + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}</span>
        </button>)}
      </div>
    </div>
    {children}
  </section>
}


function SunsetReel() {
  const reelRef = useRef(null)

  useEffect(() => {
    const root = reelRef.current
    if (!root) return undefined
    const videos = Array.from(root.querySelectorAll('video'))
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      })
    }, { threshold: 0.46 })
    videos.forEach(video => observer.observe(video))
    return () => observer.disconnect()
  }, [])

  return <section className="sunsetReel reveal" ref={reelRef}>
    <header className="sunsetReelIntro reveal"><span>01.5 / AFTERGLOW REEL</span></header>
    <article className="sunsetReelScene sceneOne">
      <div className="sunsetType sunsetTypeLeft reveal" aria-hidden="true"><small>CITY OF</small><b>SUNSET</b><i>余晖 / 驾驶 / 音乐</i></div>
      <div className="sunsetReelFrame reveal">
        <div className="sunsetVideoTitle"><b>日落之后</b><small>DRIVE INTO THE AFTERGLOW</small></div>
        <video src={A + 'sunset-reel-01.mp4'} muted loop playsInline preload="metadata" aria-label="落日之城界面动态视频一" />
        <span>SCROLL TO PLAY · MUTED FILM</span>
      </div>
      <div className="sunsetType sunsetTypeRight reveal" aria-hidden="true"><small>DRIVE INTO</small><small>THE AFTERGLOW</small><i>落日 / 余温 / 行驶</i></div>
    </article>
    <article className="sunsetReelScene sceneTwo">
      <div className="sunsetType sunsetTypeLeft reveal" aria-hidden="true"><small>Q MUSIC IDEAS</small><small>QQ音乐 · 车载皮肤设计</small><i>IN-CAR MUSIC SKIN / 2025</i></div>
      <div className="sunsetReelFrame reveal">
        <div className="sunsetVideoTitle"><b>声景流动</b><small>IN-CAR MUSIC SKIN / 2025</small></div>
        <video src={A + 'sunset-reel-02.mp4'} muted loop playsInline preload="metadata" aria-label="落日之城界面动态视频二" />
        <span>02 / DIGITAL SUNSET</span>
      </div>
      <div className="sunsetType sunsetTypeRight reveal" aria-hidden="true"><b>让音乐<br />驶过城市</b><small>LISTEN / MOVE / DUSK</small></div>
    </article>
    <footer className="sunsetReelOutro reveal"><span>THE SUN GOES DOWN</span><i></i><b>余晖停在交互的最后一帧</b></footer>
  </section>
}
function AdmissionChapter({ onImage }) {
  const sets = useMemo(() => ({
    '2024': ['20260714-111912.webp', '20260714-111722.webp', '20260714-111950.webp'],
    '2025': ['20260714-112951.webp', '20260714-112946.webp', '20260714-113007.webp', '20260714-113012.webp', '20260714-112956.webp', '20260714-113001.webp', '20260714-113021.webp', '20260714-113026.webp', '20260714-113033.webp']
  }), [])
  return <section id="admission" className="chapter admission" data-theme="paper">
    <div className="chapterHeading reveal">
      <p className="eyebrow">03 / PAPER NARRATIVE</p>
      <div className="titleRow"><h2>一封通知书<br />两次叙事实验</h2><p>ADMISSION LETTER<br />2024—2025</p></div>
      <div className="projectMeta"><span>XI'AN TECHNOLOGICAL UNIVERSITY</span><span>PACKAGING / PRINT / STRUCTURE</span></div>
    </div>
    <div className="admissionIntro reveal">
      <p>通知书不是信息的终点，而是新生活的第一件纪念物。2024 年从建筑线稿与烫金工艺出发；2025 年让图书馆从纸面跃起，以立体结构承载学校七十年的时间线。</p>
    </div>
    {Object.entries(sets).map(([year, images]) => <article className="yearStory" key={year}>
      <header className="reveal"><b>{year}</b><span>{year === '2024' ? '建筑成为封面' : '图书馆跃然纸上'}</span></header>
      <div className="yearGallery">
        {images.map((img, i) => <button className={'reveal year-' + (i + 1)} key={img} onClick={() => onImage(img, year + ' 录取通知书 ' + (i + 1))} aria-label={'查看' + year + '录取通知书图 ' + (i + 1)}>
          <img src={A + img} alt={year + '录取通知书设计 ' + (i + 1)} loading="lazy" />
        </button>)}
      </div>
    </article>)}
  </section>
}


function BarberStory({ onImage }) {
  const images = ['20260714-174434.jpg', '20260714-174441.jpg', '20260714-174447.png']
  return <article className="barberStory reveal">
    <div className="titleRow">
      <h3>倾理</h3>
      <p>CHAIN BARBERSHOP<br />LOGO IDENTITY</p>
    </div>
    <div className="projectMeta"><span>BRAND IDENTITY</span><span>LOGO / SIGNAGE / APPLICATION</span><span>注心意 / 出理想</span></div>
    <div className="storyCopy barberCopy">
      <p className="lead">一套为连锁理发店设计的轻量化品牌识别。标志将理发梳、门店入口与“理”的秩序感压缩为单线图形，保留干净、克制、可复制的连锁气质。</p>
    </div>
    <div className="barberGallery">
      {images.map((img, i) => <button className={'imageFrame reveal image-' + (i + 1)} key={img} onClick={() => onImage(img, '倾理连锁理发店 logo 设计 ' + (i + 1))} aria-label={'查看倾理 logo 设计图 ' + (i + 1)}>
        <img src={A + img} alt={'倾理连锁理发店 logo 设计展示 ' + (i + 1)} loading="lazy" />
        <span>{String(i + 1).padStart(2, '0')} / 03</span>
      </button>)}
    </div>
  </article>
}
function OpeningSequence() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  if (hidden) return null

  return <div className="openingSequence openingBoot" aria-label="网站开场动画">
    <div className="openingBootGrid" aria-hidden="true">
      <span></span><span></span><span></span>
      <span></span><span></span><span></span>
      <span></span><span></span><span></span>
    </div>
    <div className="openingBootLight" aria-hidden="true"></div>
    <div className="openingBootText">
      <span>GJL VISUAL STORIES / SUNSET REEL</span>
      <b>SUNSET<br />STORIES.</b>
      <span>从落日开始的视觉叙事</span>
    </div>
  </div>
}
export function VisualPortfolio() {
  const [active, setActive] = useState('music')
  const [theme, setTheme] = useState('sunset')
  const [progress, setProgress] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) { setActive(visible.target.id); setTheme(visible.target.dataset.theme || 'ink') }
    }, { rootMargin: '-28% 0px -52% 0px', threshold: [0, .2, .45] })
    document.querySelectorAll('.chapter').forEach(el => observer.observe(el))
    const reveal = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('isVisible')), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el))
    const onScroll = () => setProgress(Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)))
    addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => { observer.disconnect(); reveal.disconnect(); removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    const sendHeight = () => window.parent.postMessage({ type: 'pingmian-height', height: document.documentElement.scrollHeight }, '*')
    sendHeight()
    const observer = new ResizeObserver(sendHeight)
    observer.observe(document.documentElement)
    window.addEventListener('load', sendHeight)
    return () => {
      observer.disconnect()
      window.removeEventListener('load', sendHeight)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [theme, lightbox])

  const jump = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const openImage = (src, alt) => setLightbox({ src, alt })

  return <div className="pingmianPortfolio" data-theme={theme}>
    <OpeningSequence />
    <div className="progress" style={{ transform: 'scaleX(' + progress + ')' }} />
    <header className="topbar">
      <button className="wordmark" onClick={() => jump('music')}>GJL <span>VISUAL STORIES</span></button>
      <div className="topMeta">GRAPHIC / BRAND / PACKAGING<br />XI'AN · CN · 2026</div>
      <a href="https://gujiale.cn" aria-label="进入工业设计作品集">进入工业设计作品集</a>
    </header>

    <nav className="chapterRail" aria-label="作品章节">
      {chapters.map(ch => <button className={active === ch.id ? 'active' : ''} onClick={() => jump(ch.id)} key={ch.id} aria-label={'前往' + ch.cn}>
        <span>{ch.index}</span><i></i><b>{ch.cn}</b>
      </button>)}
    </nav>

    <main>
      <ProjectChapter id="music" chapter={chapters[0]} project={projects.music} layout="cinema" onImage={openImage}><SunsetReel /></ProjectChapter>
      <ProjectChapter id="msi" chapter={chapters[1]} project={projects.msi} layout="campaign" onImage={openImage} />
      <AdmissionChapter onImage={openImage} />
      <ProjectChapter id="lamp" chapter={chapters[3]} project={projects.lamp} layout="warm" onImage={openImage} />
      <ProjectChapter id="danyang" chapter={chapters[4]} project={projects.danyang} layout="brand" onImage={openImage} />
      <section className="chapter barberAppend" data-theme="jade"><BarberStory onImage={openImage} /></section>
    </main>

    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label="作品大图预览" onClick={() => setLightbox(null)}>
      <button onClick={() => setLightbox(null)}>关闭</button>
      <img src={A + lightbox.src} alt={lightbox.alt} onClick={e => e.stopPropagation()} />
    </div>}
  </div>
}
