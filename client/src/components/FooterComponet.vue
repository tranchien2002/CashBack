<template>
  <div class="headers">
    <div>
      <div class="header-v1-wrap">
        <div class="header-wrap">
          <div class="top-header-wrap d-block primary">
            <div class="top-header">
              <div class="container">
                <div class="layout align-center justify-space-between">
                  <div class="options hidden-md-and-down d-md-inline-flex align-items-center">
                    <div class="lang-menu">
                      <div class="v-toolbar__title">
                        <a href="javascript:void(0)" class="white--text font-weight-regular"
                          >English</a
                        ><i aria-hidden="true" class="v-icon notranslate material-icons theme--dark"
                          >arrow_drop_down</i
                        >
                      </div>
                      <div class="v-menu">
                        <div
                          role="menu"
                          class="v-menu__content theme--light "
                          style="min-width: 0px; top: 12px; left: 0px; transform-origin: left top; z-index: 0; display: none;"
                        ></div>
                      </div>
                    </div>
                    <div class="currency-menu">
                      <div class="v-toolbar__title">
                        <a heref="javascript:void(0)" class="white--text font-weight-regular">USD</a
                        ><i aria-hidden="true" class="v-icon notranslate material-icons theme--dark"
                          >arrow_drop_down</i
                        >
                      </div>
                      <div class="v-menu">
                        <div
                          role="menu"
                          class="v-menu__content theme--light "
                          style="min-width: 0px; top: 12px; left: 0px; transform-origin: left top; z-index: 0; display: none;"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="site-logo d-inline-block">
                    <a href="/" class="router-link-active"
                      ><img alt="site-logo" height="34" src="/static/images/logo.png" width="224"
                    /></a>
                  </div>
                  <div class="notifications d-inline-flex align-items-center">
                    <div class="mr-3">
                      <button
                        type="button"
                        class="cart-btn v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--small accent"
                      >
                        <span class="v-btn__content"
                          ><span class="v-badge" right="" large=""
                            ><i
                              aria-hidden="true"
                              class="v-icon notranslate material-icons theme--dark"
                              >shopping_cart</i
                            ><span right="" large="" class="v-badge__badge accent"
                              ><span>1</span></span
                            ></span
                          ></span
                        >
                      </button>
                      <div class="v-menu cart">
                        <div
                          role="menu"
                          class="v-menu__content theme--light "
                          style="min-width: 300px; max-width: 300px; top: 12px; left: 0px; transform-origin: left top; z-index: 0; display: none;"
                        ></div>
                      </div>
                    </div>
                    <div class="mr-3">
                      <button
                        type="button"
                        class="wishlist-btn v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--small accent"
                      >
                        <span class="v-btn__content"
                          ><span class="v-badge" right="" large=""
                            ><i
                              aria-hidden="true"
                              class="v-icon notranslate material-icons theme--dark"
                              >favorite</i
                            ><span right="" large="" class="v-badge__badge accent"
                              ><span>1</span></span
                            ></span
                          ></span
                        >
                      </button>
                      <div class="v-menu wishlit-menu-wrap">
                        <div
                          role="menu"
                          class="v-menu__content theme--light "
                          style="min-width: 300px; max-width: 300px; top: 12px; left: 0px; transform-origin: left top; z-index: 0; display: none;"
                        ></div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        class="v-btn v-btn--contained v-btn--fab v-btn--round theme--light v-size--small"
                      >
                        <span class="v-btn__content"
                          ><img
                            src="/static/images/user-3.jpg"
                            width="40"
                            height="40"
                            class="v-btn--round"
                        /></span>
                      </button>
                      <div class="v-menu userblock-dropdown">
                        <div
                          role="menu"
                          class="v-menu__content theme--light "
                          style="min-width: 200px; max-width: 200px; top: 30px; left: 0px; transform-origin: left top; z-index: 0; display: none;"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-header d-block primary">
            <div class="container">
              <div class="bottom-header-inner">
                <div class="menu-alignment">
                  <div class="navbar">
                    <ul class="app-nav-list pl-0">
                      <li class="app-nav-item">
                        <a href="/home" class="router-link-exact-active router-link-active">Home</a>
                        <ul class="sub-menu">
                          <li>
                            <a href="/home" class="router-link-exact-active router-link-active"
                              >Home One</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/home-two" class="">Home Two</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/home-three" class="">Home Three</a
                            ><!---->
                          </li>
                        </ul>
                        <!---->
                      </li>
                      <li class="app-nav-item">
                        <a href="/home" class="router-link-exact-active router-link-active">Shop</a>
                        <ul class="sub-menu">
                          <li>
                            <a href="/products/men/102" class="">Product Details</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/cart" class="">Cart</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/checkout" class="">Checkout</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/checkout/payment" class="">Payment</a
                            ><!---->
                          </li>
                        </ul>
                        <!---->
                      </li>
                      <li class="app-nav-item">
                        <a href="/products/accessories" class="">Accessories</a
                        ><!----><!---->
                      </li>
                      <li class="app-nav-item">
                        <a href="/home" class="router-link-exact-active router-link-active"
                          >Categories</a
                        ><!---->
                        <ul class="sub-menu mega">
                          <li>
                            <a>Men</a>
                            <ul class="sub-menu">
                              <li><a href="/products/Men?category=T-shirt" class="">T-Shirt</a></li>
                              <li><a href="/products/Men?category=Shirt" class="">Shirt</a></li>
                              <li><a href="/products/Men?category=Jeans" class="">Jean</a></li>
                              <li><a href="/products/Men?category=Jackets" class="">Jackets</a></li>
                            </ul>
                          </li>
                          <li>
                            <a>Women</a>
                            <ul class="sub-menu">
                              <li>
                                <a href="/products/Women?category=Dresses" class="">Dresses</a>
                              </li>
                              <li><a href="/products/Women?category=Jean" class="">Jean</a></li>
                              <li><a href="/products/Women?category=Shirt" class="">Shirt</a></li>
                              <li>
                                <a href="/products/Women?category=Jackets" class="">Jackets</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>Gadgets</a>
                            <ul class="sub-menu">
                              <li>
                                <a href="/products/Gadgets?category=Headphone" class=""
                                  >Headphone</a
                                >
                              </li>
                              <li>
                                <a href="/products/Gadgets?category=Smartphone" class=""
                                  >Smartphone</a
                                >
                              </li>
                              <li><a href="/products/Gadgets?category=Watch" class="">Watch</a></li>
                              <li>
                                <a href="/products/Gadgets?category=Speaker" class="">Speaker</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>Accessories</a>
                            <ul class="sub-menu">
                              <li>
                                <a href="/products/Accessories?category=Laptop" class=""
                                  >Laptop Accessories</a
                                >
                              </li>
                              <li>
                                <a href="/products/Accessories?category=Belts" class="">Belts</a>
                              </li>
                              <li>
                                <a href="/products/Accessories?category=Jewellery" class=""
                                  >Jewellery</a
                                >
                              </li>
                              <li>
                                <a href="/products/Accessories?category=Purse" class="">Purse</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li class="app-nav-item">
                        <a href="/home" class="router-link-exact-active router-link-active"
                          >Pages</a
                        >
                        <ul class="sub-menu">
                          <li>
                            <a href="/about" class="">About</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/term-condition" class="">Term and Condition</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/privacy-policy" class="">Privacy Policy</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/blog-detail/1" class="">Blog Detail</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/faq" class="">FAQ</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/not-found" class="">404 Page</a
                            ><!---->
                          </li>
                          <li>
                            <a href="/account/profile" class="">User Profile</a
                            ><!---->
                          </li>
                          <li>
                            <a
                              href="/home"
                              class="router-link-exact-active router-link-active menu-item-has-children"
                              >Session</a
                            >
                            <ul class="sub-menu">
                              <li><a href="/session/signin" class="">Sign In</a></li>
                              <li><a href="/session/signup" class="">Register</a></li>
                              <li>
                                <a href="/session/forgot-password" class="">Forgot Password</a>
                              </li>
                              <li><a href="/session/thank-you" class="">Thank You</a></li>
                            </ul>
                          </li>
                        </ul>
                        <!---->
                      </li>
                      <li class="app-nav-item">
                        <a href="/contact" class="">Contact Us</a
                        ><!----><!---->
                      </li>
                      <li class="app-nav-item">
                        <a href="/admin-panel/reports" class="">Admin Panel</a
                        ><!----><!---->
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="layout align-left responsive-menu">
                  <button
                    type="button"
                    class="toggle-btn v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--large"
                  >
                    <span class="v-btn__content"><i class="material-icons">menu</i></span>
                  </button>
                </div>
                <div>
                  <div class="search-box">
                    <button
                      type="button"
                      class="d-inline-block v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--default accent"
                    >
                      <span class="v-btn__content"
                        ><i aria-hidden="true" class="v-icon notranslate material-icons theme--dark"
                          >search</i
                        ></span
                      >
                    </button>
                  </div>
                  <!---->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="fixedHeader" style="opacity: 0; visibility: hidden; top: 0px;">
        <div class="fixed-header-wrap">
          <div class="header-wrap primary px-4">
            <div class="container grid-list-xl">
              <div class="layout align-center justify-space-between row ma-0">
                <div class="site-logo d-inline-block">
                  <a href="/" class="router-link-active"
                    ><img alt="site-logo" height="34" src="/static/images/logo.png" width="224"
                  /></a>
                </div>
                <div>
                  <div class="menu-alignment">
                    <div class="navbar">
                      <ul class="app-nav-list pl-0">
                        <li class="app-nav-item">
                          <a href="/home" class="router-link-exact-active router-link-active"
                            >Home</a
                          >
                          <ul class="sub-menu">
                            <li>
                              <a href="/home" class="router-link-exact-active router-link-active"
                                >Home One</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/home-two" class="">Home Two</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/home-three" class="">Home Three</a
                              ><!---->
                            </li>
                          </ul>
                          <!---->
                        </li>
                        <li class="app-nav-item">
                          <a href="/home" class="router-link-exact-active router-link-active"
                            >Shop</a
                          >
                          <ul class="sub-menu">
                            <li>
                              <a href="/products/men/102" class="">Product Details</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/cart" class="">Cart</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/checkout" class="">Checkout</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/checkout/payment" class="">Payment</a
                              ><!---->
                            </li>
                          </ul>
                          <!---->
                        </li>
                        <li class="app-nav-item">
                          <a href="/products/accessories" class="">Accessories</a
                          ><!----><!---->
                        </li>
                        <li class="app-nav-item">
                          <a href="/home" class="router-link-exact-active router-link-active"
                            >Categories</a
                          ><!---->
                          <ul class="sub-menu mega">
                            <li>
                              <a>Men</a>
                              <ul class="sub-menu">
                                <li>
                                  <a href="/products/Men?category=T-shirt" class="">T-Shirt</a>
                                </li>
                                <li><a href="/products/Men?category=Shirt" class="">Shirt</a></li>
                                <li><a href="/products/Men?category=Jeans" class="">Jean</a></li>
                                <li>
                                  <a href="/products/Men?category=Jackets" class="">Jackets</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a>Women</a>
                              <ul class="sub-menu">
                                <li>
                                  <a href="/products/Women?category=Dresses" class="">Dresses</a>
                                </li>
                                <li><a href="/products/Women?category=Jean" class="">Jean</a></li>
                                <li><a href="/products/Women?category=Shirt" class="">Shirt</a></li>
                                <li>
                                  <a href="/products/Women?category=Jackets" class="">Jackets</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a>Gadgets</a>
                              <ul class="sub-menu">
                                <li>
                                  <a href="/products/Gadgets?category=Headphone" class=""
                                    >Headphone</a
                                  >
                                </li>
                                <li>
                                  <a href="/products/Gadgets?category=Smartphone" class=""
                                    >Smartphone</a
                                  >
                                </li>
                                <li>
                                  <a href="/products/Gadgets?category=Watch" class="">Watch</a>
                                </li>
                                <li>
                                  <a href="/products/Gadgets?category=Speaker" class="">Speaker</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a>Accessories</a>
                              <ul class="sub-menu">
                                <li>
                                  <a href="/products/Accessories?category=Laptop" class=""
                                    >Laptop Accessories</a
                                  >
                                </li>
                                <li>
                                  <a href="/products/Accessories?category=Belts" class="">Belts</a>
                                </li>
                                <li>
                                  <a href="/products/Accessories?category=Jewellery" class=""
                                    >Jewellery</a
                                  >
                                </li>
                                <li>
                                  <a href="/products/Accessories?category=Purse" class="">Purse</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li class="app-nav-item">
                          <a href="/home" class="router-link-exact-active router-link-active"
                            >Pages</a
                          >
                          <ul class="sub-menu">
                            <li>
                              <a href="/about" class="">About</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/term-condition" class="">Term and Condition</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/privacy-policy" class="">Privacy Policy</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/blog-detail/1" class="">Blog Detail</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/faq" class="">FAQ</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/not-found" class="">404 Page</a
                              ><!---->
                            </li>
                            <li>
                              <a href="/account/profile" class="">User Profile</a
                              ><!---->
                            </li>
                            <li>
                              <a
                                href="/home"
                                class="router-link-exact-active router-link-active menu-item-has-children"
                                >Session</a
                              >
                              <ul class="sub-menu">
                                <li><a href="/session/signin" class="">Sign In</a></li>
                                <li><a href="/session/signup" class="">Register</a></li>
                                <li>
                                  <a href="/session/forgot-password" class="">Forgot Password</a>
                                </li>
                                <li><a href="/session/thank-you" class="">Thank You</a></li>
                              </ul>
                            </li>
                          </ul>
                          <!---->
                        </li>
                        <li class="app-nav-item">
                          <a href="/contact" class="">Contact Us</a
                          ><!----><!---->
                        </li>
                        <li class="app-nav-item">
                          <a href="/admin-panel/reports" class="">Admin Panel</a
                          ><!----><!---->
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="layout align-left responsive-menu">
                    <button
                      type="button"
                      class="toggle-btn v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--default"
                    >
                      <span class="v-btn__content"><i class="material-icons">menu</i></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
