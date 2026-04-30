---
layout: page
title: 团队成员
description: 团队成员列表
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/ghost.png',
    name: '成员姓名',
    title: '职位',
    desc: '成员简介',
    links: [
      { icon: 'github', link: 'https://github.com/' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的团队</template>
    <template #lead>在此填写团队简介</template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />
</VPTeamPage>
