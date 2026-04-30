---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 网站名称
  text: 网站标语
  tagline: 网站简介描述文字
  image:
    src: /logo.png
    alt: 网站 Logo
  actions:
    - theme: brand
      text: 开始使用
      link: /press/


---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
<confetti />
