<template>
  <div class="context">
    <div class="tool"></div>
    <div class="menu-box">
      <nav>
        <ul class="nav-list">
          <li v-for="(menu, index) in menus" :key="index" @click="clickMenu(menu.id)"
            :class="['nav-item', active_menu_id == menu.id ? 'active' : '']">
            {{ menu.title }}
          </li>
        </ul>
      </nav>
      <div class="tag">
        <div class="tag-item" v-for="(web, index) in webs" :key="index" @click="clickWeb(web)">
          <div class="tag-item-content">
            <img style="width: 64px;height:64px" :src="prx + '/images/' + web.icon" alt="" />
          </div>
          <div class="tag-item-title">{{ web.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"; 
interface Navigation {
  id: string;
  title: string;
  key: string;
}
interface NavigationItem {
  name: string;
  url: string;
  icon: string;
}
const isProduction = import.meta.env.MODE === 'production';
const menus = ref<Navigation[]>([]);
const active_menu_id = ref('1')
const webs = ref<NavigationItem[]>([])

const prx = ref('')

const init = async () => {
  if (isProduction) {
    prx.value = '/yun_web'
  }
  try {
    const response = await fetch(prx.value + "/json/menu.json");
    if (!response.ok) {
      throw new Error("Failed to fetch navigation data");
    }
    const data = await response.json();
    menus.value = data;
    get_web_tag('1')
  } catch (error) {
    console.error("Error loading navigation data:", error);
  }
};

const get_web_tag = async (id: string) => {
  try {
    const response = await fetch(prx.value + "/json/webs.json");
    if (!response.ok) {
      throw new Error("Failed to fetch navigation data");
    }
    const data = await response.json();
    webs.value = data[id]
  } catch (error) {
    console.error("Error loading navigation data:", error);
  }
}


const clickWeb = (web: NavigationItem) => {
  window.open(web.url, '_blank')
}
const clickMenu = (id: string) => {
  active_menu_id.value = id
  get_web_tag((id))
}

onMounted(async () => {
  init();
});
</script>
<style scoped> .context {
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   align-items: center;
   background-image: url("./assets/bj.jpg");
 }

 .tool {
   height: 200px;
 }

 .menu-box {
   width: 1000px;
 }

 .nav-list {
   list-style-type: none;
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: space-around;
   cursor: pointer;
   line-height: 30px;
   position: relative;
   overflow: hidden;
   white-space: nowrap;
   padding-top: 10px;
   font-size: 18px;

 }

 .active {
   font-weight: 600;
   border-bottom: 2px solid #007bff;
 }

 .nav-item {
   margin-right: 10px;
   min-width: 100px;
   padding-bottom: 5px;
 }

 .nav-item a {
   text-decoration: none;
   color: #007bff;
 }

 .nav-item a.active {
   font-weight: bold;
   color: #ff5f5f;
 }

 .tag {
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-content: flex-start;
   justify-content: center;
   align-items: flex-start;
   cursor: pointer;
 }

 .tag-item {
   width: 166px;
   height: 150px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   margin-bottom: 20px;
   border-radius: 10px;
 }
</style>