<template>
  <ul class="navbar-nav mr-2 mb-2 mb-lg-0">
    <!-- Avatar -->
    <div
      v-if="adminEntrance"
      class="dropdown">
      <button
        @click="myFunction2"
        class="dropbtn"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div
        id="myDropdown2"
        class="dropdown-content"
        @click="myFunction2"
      >
        <router-link
          to="/"
        >
          Головна
        </router-link>
        <router-link
          class="dropdown-item"
          to="/add_user"
          exact
        >Додати категорію фото
        </router-link>
        <router-link
          class="dropdown-item"
          to="/list"
          exact
        >
          Список категорій фото
        </router-link>
        <a
          class="dropdown-item"
          href="https://squoosh.app/index.html"
          target="_blank"
        >
          Сжати фото
        </a>
      </div>
    </div>
    <li
      style="color: #3c8baf; margin-right: 5px"
      v-if="adminEntrance"
    >
      {{getUserName}}
    </li>
    <li
      v-if="adminEntrance"
      class="nav-item dropdown mr-4"
    >
      <img
        style="height: 40px"
        :src="getProfilePicUrl"
        class="rounded-circle"
        alt=""
        loading="lazy"
      />
    </li>
    <li>
      <button
        v-if="!adminEntrance"
        type="button"
        class="btn btn-outline-light btn-rounded mr-auto"
        data-ripple-color="dark"
        @click="signInWithGoogle"
      >
        <i class="fas fa-user-circle"></i> Війти через Google
      </button>
    </li>
    <li>
      <button
        @click="logout"
        v-if="adminEntrance"
        type="button"
        class="btn btn-outline-primary btn-rounded mr-auto"
        data-ripple-color="dark"
      >
        Вийти
      </button>
    </li>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">×</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
    <span style="font-size:30px;cursor:pointer" @click="openNav">☰ open</span>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import store from '@/store'
import firebase from 'firebase'

export default defineComponent({
  name: 'google',
  methods: {
    openNav () {
      document.getElementById('mySidenav').style.width = '250px'
    },
    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    },
    myFunction2 () {
      document.getElementById('myDropdown2').classList.toggle('show')
    },
    mounted () {
      document.addEventListener('click', this.onClick)
    },
    beforeDestroy () {
      document.removeEventListener('click', this.onClick)
    },
    onClick (event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName('dropdown-content')
        var i
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i]
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show')
          }
        }
      }
    },
    filterFunction () {
      // if (!event.target.matches('.dropbtn')) {
      //   var dropdowns = document.getElementsByClassName('dropdown-content')
      //   var i
      //   for (i = 0; i < dropdowns.length; i++) {
      //     const openDropdown = dropdowns[i]
      //     if (openDropdown.classList.contains('show')) {
      //       openDropdown.classList.remove('show')
      //     }
      //   }
      // }

      const filter = this.input.value.toUpperCase()
      const div = document.getElementById('myDropdown')
      const a = div.getElementsByTagName('a')
      for (let i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = ''
        } else {
          a[i].style.display = 'none'
        }
      }
    }
  },
  setup () {
    const showDropdownMenu = ref(false)

    const adminEntrance = computed(() => store.state.adminEntrance)
    const signInWithGoogle = () => {
      try {
        store.dispatch('signInWithGoogle')
      } catch (e) {
        console.log('Ошибка входа Google')
      }
    }
    const logout = () => {
      store.dispatch('logout')
    }

    const getUserName = computed(() => firebase.auth().currentUser.displayName)
    const getProfilePicUrl = computed(() => firebase.auth().currentUser.photoURL)
    return {
      getProfilePicUrl,
      getUserName,
      logout,
      signInWithGoogle,
      showDropdownMenu,
      adminEntrance
    }
  }
})
</script>

<style scoped>
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
  }

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }
  .dropbtn {
    /*background-color: #212;*/
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropbtn:hover, .dropbtn:focus {
    background-color: #392139;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f6f6f6;
    min-width: 230px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 99999;
  }

  .dropdown-content a {
    color: #2d2727;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown a:hover {background-color: #ddd;}

  .show {display: block;}
</style>
