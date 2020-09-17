<template>
  <div class="rn">
    <header class="nb reveal-from-top">
      <div class="tcontainern opacity-0">
        <div class="n_">
          <div class="nk">
            <h1 class="sz">
              <a href="#">
                <img src="@/assets/fonts/logo.png" alt="Neon" width="250" height="250" />
              </a>
            </h1>
          </div>
          <button id="th" class="th" aria-controls="primary-menu" aria-expanded="false">
            <span class="se">Menu</span>
            <span class="tp">
              <span class="td"></span>
            </span>
          </button>
          <nav id="nj" class="nj">
            <div class="nq">
              <ul class="st re">
                <li>
                  <router-link to="/markets" class="tbuttonn fbuttonl gbuttony sbuttono"
                    >Markets</router-link
                  >
                </li>
              </ul>
              <ul class="st h re">
                <li>
                  <router-link to="/account">My Account</router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <main class="nw">
      <section class="rb nx tillustration-section-n">
        <div class="tcontainern opacity-0">
          <div class="rm rd">
            <div class="nf np">
              <div class="split-item">
                <div class="rg nh az">
                  <h1 class="oe ok reveal-from-bottom" data-reveal-delay="150">
                    Start-up CashBack and the Boomerang
                  </h1>
                  <p class="oe us reveal-from-bottom" data-reveal-delay="300">
                    We pay more than cash back
                  </p>
                  <div class="reveal-from-bottom" data-reveal-delay="450">
                    <router-link to="/markets" class="tbuttonn fbuttonl gbuttony"
                      >Get started now</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="rr az">
      <div class="tcontainern opacity-0">
        <div class="ri">
          <div class="rs rh h">
            <div class="nk">
              <a href="#">
                <img src="@/assets/fonts/logo.png" alt="Neon" width="200" height="200" />
              </a>
            </div>
            <div class="rl">
              <ul class="st">
                <li>
                  <a href="#">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Facebook</title>
                      <path
                        d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Twitter</title>
                      <path
                        d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Instagram</title>
                      <g>
                        <circle cx="12.145" cy="3.892" r="1" />
                        <path
                          d="M8 12c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"
                        />
                        <path
                          d="M12 16H4c-2.056 0-4-1.944-4-4V4c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zM4 2c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2V4c0-.935-1.065-2-2-2H4z"
                        />
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="ro rh h rp">
            <nav class="rc">
              <ul class="st">
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">FAQ's</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </nav>
            <div class="footer-copyright">© 2020 - Boomer Team</div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Home',
  components: {},
  async mounted() {
    setTimeout(() => {
      var element = document.querySelectorAll('.tcontainern');
      for (let i = 0; i < element.length; i++) {
        element[i].classList.add('a-opacity-1');
      }
    }, 500);
    // window.addEventListener('load', () => this.initMarket());
    await this.initMarket();
    await this.fetchSellingItems();
  },
  methods: {
    ...mapActions(['signInWallet', 'signOutWallet', 'initMarket', 'fetchSellingItems'])
  }
};
</script>

<style scoped>
@import '../assets/css/home-style.css';
@media (min-width: 641px) {
  .rb .nf .split-item {
    min-height: 492px;
  }
}

.opacity-0 {
  opacity: 0;
}

.a-opacity-1 {
  opacity: 1;
  transform: translate(0);
  transition: opacity 1s cubic-bezier(0.39, 0.575, 0.565, 1),
    transform 1s cubic-bezier(0.39, 0.575, 0.565, 1),
    -webkit-transform 1s cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>
