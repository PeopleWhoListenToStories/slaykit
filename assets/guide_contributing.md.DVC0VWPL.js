import{_ as a,c as n,a0 as e,o as p}from"./chunks/framework.Db5sgsAJ.js";const h=JSON.parse('{"title":"slaykit 贡献指南","description":"","frontmatter":{},"headers":[],"relativePath":"guide/contributing.md","filePath":"guide/contributing.md"}'),i={name:"guide/contributing.md"};function l(t,s,o,c,r,d){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="slaykit-贡献指南" tabindex="-1">slaykit 贡献指南 <a class="header-anchor" href="#slaykit-贡献指南" aria-label="Permalink to &quot;slaykit 贡献指南&quot;">​</a></h1><ul><li>Node.JS &gt;= 18</li><li>PNPM v9</li></ul><h2 id="_1-本地环境安装试运行" tabindex="-1">1. 本地环境安装试运行 <a class="header-anchor" href="#_1-本地环境安装试运行" aria-label="Permalink to &quot;1. 本地环境安装试运行&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># https</span></span>
<span class="line"><span>git clone https://github.com/PeopleWhoListenToStories/slaykit.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ssh</span></span>
<span class="line"><span>git clone git@github.com:PeopleWhoListenToStories/slaykit.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 进入 slaykit 目录</span></span>
<span class="line"><span>cd slaykit &amp;&amp; pnpm install</span></span></code></pre></div><h2 id="_2-贡献流程" tabindex="-1">2. 贡献流程 <a class="header-anchor" href="#_2-贡献流程" aria-label="Permalink to &quot;2. 贡献流程&quot;">​</a></h2><ul><li>先查阅<a href="https://PeopleWhoListenToStories.github.io/slaykit/" target="_blank" rel="noreferrer">文档</a>是否有你所需要的<code>函数方法</code>；</li><li>如果没有你想要的<code>函数方法</code>，你有两种方式： <ul><li>发起一个 <a href="https://PeopleWhoListenToStories.github.io/slaykit" target="_blank" rel="noreferrer">issues</a> 讨论，评审人评论<code>PR Welcome</code>表示该<code>idea</code>可行，然后你就可以 fork 代码开发了；</li><li>关闭当前页面，骂一顿这个作者：这是什么 laji 库；</li></ul></li></ul><h2 id="_3-功能开发流程" tabindex="-1">3. 功能开发流程 <a class="header-anchor" href="#_3-功能开发流程" aria-label="Permalink to &quot;3. 功能开发流程&quot;">​</a></h2><ol><li><p>请先 fork 一份到自己的项目下，然后新建一个分支用于变更</p></li><li><p>基于 fork 后的项目新建分支，新建功能分支（例如 feature-getDevice）</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span># https</span></span>
<span class="line"><span>git clone 你的fork项目 https 地址</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ssh</span></span>
<span class="line"><span>git clone 你的fork项目 ssh 地址</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 进入 vmejs 目录</span></span>
<span class="line"><span>cd slaykit &amp;&amp; pnpm install</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 新建功能分支</span></span>
<span class="line"><span>git checkout -b feature-getDevice</span></span></code></pre></div><ol start="3"><li><p>完成对应函数方法（例如：<a href="https://github.com/vmejs/vmejs/blob/main/packages/core/getDevice/index.ts%EF%BC%89" target="_blank" rel="noreferrer">https://github.com/vmejs/vmejs/blob/main/packages/core/getDevice/index.ts）</a></p></li><li><p>完成对应的测试用例（例如：<a href="https://github.com/vmejs/vmejs/blob/main/packages/core/getDevice/index.test.ts%EF%BC%89" target="_blank" rel="noreferrer">https://github.com/vmejs/vmejs/blob/main/packages/core/getDevice/index.test.ts）</a></p></li><li><p>完成对应的使用文档（例如：<a href="https://github.com/vmejs/vmejs/blob/main/docs/packages/core/getDevice/index.md%EF%BC%89" target="_blank" rel="noreferrer">https://github.com/vmejs/vmejs/blob/main/docs/packages/core/getDevice/index.md）</a></p></li><li><p>你可以本地执行一些命令：</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;scripts&quot;: {</span></span>
<span class="line"><span>   // 本地打包</span></span>
<span class="line"><span>   &quot;dev&quot;: &quot;tsup --watch&quot;,</span></span>
<span class="line"><span>   &quot;build&quot;: &quot;tsup&quot;,</span></span>
<span class="line"><span>   // 本地打包文档</span></span>
<span class="line"><span>   &quot;docs:dev&quot;: &quot;pnpm -C docs dev&quot;,</span></span>
<span class="line"><span>   &quot;docs:build&quot;: &quot;pnpm run -C docs build&quot;,</span></span>
<span class="line"><span>   // 本地执行eslint prettier检查</span></span>
<span class="line"><span>   &quot;lint&quot;: &quot;eslint . --ext .vue,.js,.ts,.jsx,.tsx,.json --max-warnings 0 --cache&quot;,</span></span>
<span class="line"><span>   &quot;lint:fix&quot;: &quot;pnpm run lint --fix&quot;,</span></span>
<span class="line"><span>   &quot;format&quot;: &quot;prettier --write --cache .&quot;,</span></span>
<span class="line"><span>   // 执行测试用例</span></span>
<span class="line"><span>   &quot;test&quot;: &quot;vitest test&quot;,</span></span>
<span class="line"><span>   // 测试用例覆盖率</span></span>
<span class="line"><span>   &quot;coverage&quot;: &quot;vitest run --coverage&quot;</span></span>
<span class="line"><span>},</span></span></code></pre></div><ol start="7"><li><p>研发完成后需进行相关规则的 commit 检测</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 1. 检查代码格式</span></span>
<span class="line"><span>pnpm eslint &amp;&amp; pnpm format</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 执行测试用例</span></span>
<span class="line"><span>pnpm test</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 测试用例覆盖率</span></span>
<span class="line"><span>pnpm coverage</span></span></code></pre></div></li><li><p>以上全部 ok 后，一定要在本地执行 <code>pnpm change</code> 生成 <code>changeset</code> 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm change</span></span></code></pre></div></li><li><p><code>Git</code> 上传：严格遵守 Git Commit 规范</p><ul><li>统一格式：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;</span></span>
<span class="line"><span>// 注意冒号 : 后有空格</span></span>
<span class="line"><span>// 如 feat(user): 增加用户中心的 xx 功能</span></span>
<span class="line"><span>复制代码</span></span></code></pre></div><ul><li><p><code>scope</code> 表示 commit 的作用范围，如用户中心、购物车中心，也可以是目录名称，一般可以限定几种；</p></li><li><p><code>subject</code> 用于对 commit 进行简短的描述；</p></li><li><p><code>type</code> 必填，表示提交类型，值一般有以下几种：</p><ul><li>feat：新功能 feature</li><li>bug：测试反馈 bug 列表中的 bug 号</li><li>fix： 修复 bug</li><li>ui：更新 UI；</li><li>docs： 文档注释变更</li><li>style： 代码格式(不影响代码运行的变动)；</li><li>refactor： 重构、优化(既不增加新功能，也不是修复 bug)；</li><li>perf： 性能优化；</li><li>release：发布；</li><li>deploy：部署；</li><li>test： 增加测试</li><li>chore： 构建过程或辅助工具的变动</li><li>revert： 回退</li><li>build： 打包</li></ul></li></ul></li></ol><h2 id="_4-code-review" tabindex="-1">4. Code Review <a class="header-anchor" href="#_4-code-review" aria-label="Permalink to &quot;4. Code Review&quot;">​</a></h2><ul><li>你 fork 的功能分支提交 PR 合并至<code>main</code>分支</li><li>代码审核与优化</li><li>审核人<code>Approved</code>后合入<code>main</code>分支</li></ul>`,14)]))}const g=a(i,[["render",l]]);export{h as __pageData,g as default};
