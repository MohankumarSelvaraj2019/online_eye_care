$(document).ready(function() {
    Device.init();
    NavMain.init();
    NavSecondary.init();
    Cookie.init();
    FontSize.init();
    MosaicWall.init();
    YoutubePlaceholder.init();
    Popin.init();
    Lexique.init();
    Informations.init();
    CustomScrollBar.init();
    Timeline.init();
    Publication.init();
    TestVue.init();
    Mappemonde.init();
    BrandsCards.init();
    StepPopin.init();
    LectureZen.init();
    OtherSites.init();
    // ScreenReader.init();
    FileUploadCustom.init();
    Tracking.init();
    // CookieManager.init();
    // StickyHeader.init();
    QuizMag.init();
    initJoinUsSlick();
});

$(window).load(function() {
    Blocs.init();
    UI.init();
    GridWall.init();
    SlideShow.init();
    SlideShowPerso.init();
    PeopleCards.init();
    // OtherSites.init();
    GoogleSearchCustom.init();
    Magazine.init();
    ScreenReader.init();

});




var StickyHeader = {

    sticky: 0,

    init: function() {
        var that = this;

        if ($(".articleBox2").length > 0) {
            $(window).on('scroll', function(e) {
                $('#sticky-wrapper').on('sticky-start', function() {
                    StickyHeader.sticky = 1
                });
                $('#sticky-wrapper').on('sticky-end', function() {
                    StickyHeader.sticky = 2
                });

                if (StickyHeader.sticky === 1) {
                    $('.tobeFixed_js').addClass('articleBox2__contentImgFixed--fixed');
                }
                if (StickyHeader.sticky === 2) {
                    $('.tobeFixed_js').removeClass('articleBox2__contentImgFixed--fixed');
                }
            });
        }


    }
}

var FontSize = {
    palier: {
        "desktop": 1280,
        "tablet": 940,
        "mobile": 320
    },
    init: function() {
        FontSize.espace = $(".container1").eq(0);
        FontSize.listeResponsive = $(".withFontResponsive, .withFontResponsiveSquare");
        $(".withFontResponsive").data("typeFontResponsive", "normal");
        $(".withFontResponsiveSquare").data("typeFontResponsive", "square");

        $(window).on("resize", FontSize.resize);
        FontSize.resize();
    },
    resize: function() {
        FontSize.listeResponsive.each(function() {
            var currentWidth = FontSize.espace.outerWidth();
            var currentPalier = Device.getBreakpoint();
            var typeFontResponsive = $(this).data("typeFontResponsive");
            if ($(this).data("ratio-" + currentPalier) == undefined) {
                $(this).css("font-size", "");
                var fontSize = parseInt($(this).css("font-size"));
                var widthPalier = FontSize.palier[currentPalier];

                var ratio = (typeFontResponsive == "normal" ? (fontSize / widthPalier) : (fontSize / (widthPalier * widthPalier)));
                $(this).data("ratio-" + currentPalier, ratio)
            }

            var ratio = $(this).data("ratio-" + currentPalier);

            if (currentPalier != "mobile") {
                if (typeFontResponsive == "normal")
                    $(this).css("font-size", currentWidth * ratio);
                else if (typeFontResponsive == "square")
                    $(this).css("font-size", currentWidth * currentWidth * ratio);

                $(this).find("p, span").each(function() {
                    var ChildfontSize = parseInt($(this).css("font-size"));
                    if (ChildfontSize <= 12 && currentWidth < 1280)
                        $(this).css("font-size", "12px");
                    else
                        $(this).css("font-size", "");
                });
            } else
                $(this).css("font-size", "");
        });
    }
}

//POINTS DE RUPTURE
var Device = {
    isPaysage: false,
    isMobile: false,
    isTablette: false,
    isDesktop: false,
    isTouch: false,
    isIOS: false,
    isChrome: false,
    init: function() {
        $(window).resize(Device.check)
        Device.check();
    },
    check: function() {
        Device.isTouch = ('ontouchstart' in window);
        Device.isPaysage = (window.innerWidth > window.innerHeight);
        Device.isMobile = (window.innerWidth < 768);
        Device.isTablette = (window.innerWidth >= 768 && window.innerWidth < 992);
        Device.isDesktop = (window.innerWidth >= 992);
        Device.isIOS = (navigator.userAgent.indexOf("iPad") != -1) || (navigator.userAgent.indexOf("iPhone") != -1) || (navigator.userAgent.indexOf("iPod") != -1);
        Device.isChrome = !!window.chrome;
    },
    getBreakpoint: function() {
        Device.check();
        if (Device.isMobile)
            return "mobile";
        else if (Device.isTablette)
            return "tablet";
        else
            return "desktop";
    }
}
var jRes = jRespond([{
    label: 'mobile',
    enter: 0,
    exit: 767
}, {
    label: 'tablet',
    enter: 768,
    exit: 991
}, {
    label: 'desktop',
    enter: 992,
    exit: 10000
}]);

var NavMain = {
    init: function() {
        var mainContent = $('.mainContent');
        var navPrimary = $('.navPrimary');
        var navHeight = $('.navPrimary').height();
        $(".navPrimary").sticky({
            topSpacing: -navHeight,
            className: "navPrimary__sticky"
        });

        navPrimary.on('sticky-start', function() {
            $('.mainContent').css('margin-top', navHeight);
            $(this).css({
                "transition": "top 0.5s ease"
            });
            setTimeout(function() {
                navPrimary.addClass("navPrimary--isAnimated");
            }, 50);
        });
        navPrimary.on('sticky-end', function() {
            $('.mainContent').removeAttr('style');
            $(this).removeClass("navPrimary--isAnimated");
        });

        $('nav.navPrimary li.navPrimary__item').hover(
            function() {
                var navPrimaryOverlay = $("<div class='navPrimaryOverlay'><div class='calqueOverlay'></div></div>");
                $("body").append(navPrimaryOverlay);
                setTimeout(function() {
                    navPrimaryOverlay.addClass("navPrimaryOverlay--loaded");
                }, 100);
            },
            function() {
                $(".navPrimaryOverlay").remove();
            }
        );

        $('li.navPrimary__item').hover(
            function() {
                var primaryNavAnim = $(this).find('ul.navPrimary__subList li');
                setTimeout(function() {
                    primaryNavAnim.addClass('navPrimary__subItem__anim');
                    $(".navPrimary__subItem__anim").each(function() {
                        $(this).css("transition-delay", 0 + 0.07 * $(this).parents("ul.navPrimary__subList").eq(0).find(".navPrimary__subItem__anim").index($(this)) + "s");
                    });
                }, 100);

            },
            function() {
                $('li.navPrimary__subItem').removeClass('navPrimary__subItem__anim');
                $(".navPrimary__subItem").removeAttr("style");
            }

        );


    }
}

var NavSecondary = {
    init: function() {
        //DESKTOP
        $(".navSecondary__rubrique").on("click", ".navSecondary__link", function() {
            if (Device.isMobile) {
                var parent = $(this).parents(".navSecondary__rubrique").eq(0);

                NavSecondary.openMenu(parent);
            }
        });
        $(".navSecondary__rubrique").on("mouseenter mouseleave", function() {
            if (!Device.isMobile) {
                var parent = $(this);

                NavSecondary.openMenu(parent);
            }
        });
        $(".navSecondary__elem").each(function() {
            $(this).css("transition-delay", 0.8 + 0.1 * $(this).parents(".navSecondary").eq(0).find(".navSecondary__elem").index($(this)) + "s");
        });
        $(".navThirdly__elem").each(function() {
            $(this).css("transition-delay", 0.3 + 0.1 * $(this).parents(".navSub").eq(0).find(".navThirdly__elem").index($(this)) + "s");
        });
        $(".navSecondary").addClass("navSecondary--loaded");
        setTimeout(function() {
            $(".navSecondary__elem").css("transition-delay", "");
        }, 1500);

        $(window).on("resize", NavSecondary.resize);

        //MOBILE
        NavSecondary.mobileItems = $(".navPrimaryMobile__item, .navPrimaryMobile__header");
        NavSecondary.mobileSubLists = $(".navPrimaryMobile__subList");
        NavSecondary.resizeMobileSubLists();

        $(".btnBurger").on("click", function() {
            $(".navPrimaryMobile").addClass("navOpen");
            if ($(".navMobileOverlay").length == 0) {
                var overlay = $("<div class='navMobileOverlay'></div>")
                $(".navPrimaryMobile").prepend(overlay);
                setTimeout(function() {
                    overlay.addClass("navMobileOverlay--loaded");
                }, 100);
            }
        });
        $(".navPrimaryMobile__btnClose").on("click", function() {
            $(".navPrimaryMobile, .navPrimaryMobile__list, .navPrimaryMobile__subList").removeClass("navOpen");
            $(".navMobileOverlay").remove();
        });
        $("body").on("click", ".navMobileOverlay", function() {
            $(".navPrimaryMobile__btnClose").click();
        });
        $(".navPrimaryMobile__link").on("click", function() {
            if ($(this).siblings(".navPrimaryMobile__subList--level1").length) {
                var menu = $(this).siblings(".navPrimaryMobile__subList--level1");
                menu.addClass("navOpen");
            }
        });
        $(".navPrimaryMobile__subLink").on("click", function() {
            if ($(this).siblings(".navPrimaryMobile__subList--level2").length) {
                var menu = $(this).siblings(".navPrimaryMobile__subList--level2");
                menu.addClass("navOpen");
            }
        });
        $(".navPrimaryMobile__subLink--back").on("click", function() {
            var elem = $(".navPrimaryMobile__subList.navOpen").last();
            elem.removeClass("navOpen");
            if (elem.hasClass("navPrimaryMobile__subList--level2")) {
                elem.parents(".navPrimaryMobile__subList--level1").eq(0).addClass("navOpen");
            }
        });
    },
    openMenu: function(parent) {
        parent.siblings(".navSecondary__rubrique").removeClass("navSecondary__rubrique--selected");
        $(".navSecondary__rubrique").find(".navThirdly__rubrique").removeClass("navThirdly__rubrique--selected");

        if (parent.find(".navThirdly").length > 0) {
            parent.toggleClass("navSecondary__rubrique--selected");
            if (parent.hasClass("navSecondary__rubrique--selected")) {
                if ($(".navOverlay").length == 0) {
                    var overlay = $("<div class='navOverlay'><div class='calqueOverlay'></div></div>")
                    $("body").append(overlay);
                    setTimeout(function() {
                        overlay.addClass("navOverlay--loaded");
                    }, 100);
                }
            } else
                $(".navOverlay").remove();
        } else
            $(".navOverlay").remove();
    },
    positionMenu: function() {
        if (Device.isDesktop) {
            $(".navSecondary").css("left", $(".headerMain__inner").offset().left);
        }
    },
    resizeMobileSubLists: function() {
        var mobileItemsTotalHeight = 0;
        NavSecondary.mobileItems.each(function() {
            mobileItemsTotalHeight += $(this).outerHeight();
        });
        // mobileItemsTotalHeight += $(".navPrimaryMobile__header").outerHeight();
        NavSecondary.mobileSubLists.css({
            "height": mobileItemsTotalHeight
        });
    },
    resize: function() {
        // NavSecondary.positionMenu();
        NavSecondary.resizeMobileSubLists();
    }
}

var Blocs = {
    init: function() {
        if ($(".maxHeightJsParent").length > 0) {
            $(window).resize(Blocs.rationaliseHeight);
            Blocs.rationaliseHeight();
        }
    },
    rationaliseHeight: function() {
        $('.maxHeightJsChild').css({
            "height": "auto"
        });

        if ($(window).width() > 767) {
            $('.maxHeightJsParent').each(function() {
                var childs = $(this).find(".maxHeightJsChild");
                var heightMax = 0;
                childs.each(function() {
                    var thisHeight = 0;
                    $(this).children().each(function() {
                        thisHeight += $(this).outerHeight(true);
                    });
                    thisHeight = thisHeight + parseInt($(this).css("padding-top")) + parseInt($(this).css("padding-bottom"));
                    heightMax = (thisHeight > heightMax ? thisHeight : heightMax);
                });
                childs.css("height", heightMax);
            });
        }
    }
}

var UI = {
    init: function() {
        // Custom Selects
        $(".jsCustomSelect").selectric({
            responsive: true
        });

        $('.btnLoadMore').click(function() {
            $(this).addClass('btnLoadMore__active');
            $('.btnLoadMore__bubble').addClass('btnLoadMore__anim');
        });

        $(".toolbox--list-toggler-options").on("click", () => {
            UI.toolbox.options.toggle()
        })

        $(".toolbox--list-toggler-social").on("click", () => {
            UI.toolbox.social.toggle()
        })

        $(".toolbox--list-toggler-joinus").on("click", () => {
            UI.toolbox.joinus.toggle()
        })

        if (!Device.isTouch) {
            UI.toolbox.options.open()
            UI.toolbox.joinus.open()
        } else {
            $(".toolbox--hidden-on-touchscreens").remove();
        }

        $(".toolbox--mode-light .toolbox--hidden-on-light").remove();


        $("body").on("click", (e) => {
            if ($(e.target).parents(".toolbox").length === 0) {
                UI.toolbox.options.close()
                UI.toolbox.joinus.close()
            }
        })

        $(".jsZenReaderStart").on("click", function(e) {
            e.preventDefault();
            $(window).scrollTop(0);
            LectureZen.start();
        });
        $("body").on("click", ".jsZenReaderQuit", function(e) {
            e.preventDefault();
            responsiveVoice.cancel();
            LectureZen.quit();
        });

        $(".headerMain").addClass("loaded");
        $(".section1 > *").each(function(i) {
            $(this).css("transition-delay", (i * 0.25) + "s");
        });
        $(".section1 > *").addClass("loaded");

        $(".cardBoxList9__item.to-appear").each(function(i) {
            $(this).css("transition-delay", (i * 0.25) + "s");
        });
        $(".cardBoxList9__item.to-appear").addClass("appeared");

        $("body").on("click", function(e) {
            setTimeout(function() {
                if ($(e.target).parents(".toolBox, .toolBox1").length == 0) {
                    $("[data-toolboxenabled='true']").each(function() {
                        UI.showToolBox($(this), true);
                    });
                }
            }, 100);
        });

        /*$(window).resize(UI.addClickOnTouch);
        UI.addClickOnTouch();*/

    },
    lastType: "",

    addClickOnTouch: function() {
        if (UI.lastType != Device.isTouch) {
            UI.lastType = Device.isTouch;
            if (Device.isTouch)
                $("*").css("cursor", "pointer");
            else
                $("*").css("cursor", "");
        }
    },
    toolbox: {
        // Screenreader / Zend read mode / Print / Share
        options: {
            opened: false,
            toggle: () => {
                if (UI.toolbox.options.opened) UI.toolbox.options.close()
                else UI.toolbox.options.open()
            },
            open: async () => {
                $("#toolbox-list-options").removeClass("unrevealed")
                $(".toolbox--selectable--options").addClass("selected")
                await Promise.all($("#toolbox-list-options .toolbox--revealable-options").toArray().map((el, i) => {
                    return UI.toolbox.reveal(el, 100 * i);
                }))

                UI.toolbox.options.opened = true;
            },
            close: async () => {
                if (UI.toolbox.social.opened) {
                    await UI.toolbox.social.close();
                }
                await Promise.all($("#toolbox-list-options .toolbox--revealable-options").toArray().reverse().map((el, i) => {
                    return UI.toolbox.unreveal(el, 100 * i);
                }))
                $("#toolbox-list-options").addClass("unrevealed")
                $(".toolbox--selectable--options").removeClass("selected")
                UI.toolbox.options.opened = false;
            },
        },
        // Fb / twitter / ...
        social: {
            opened: false,
            toggle: () => {
                if (UI.toolbox.social.opened) UI.toolbox.social.close()
                else UI.toolbox.social.open()
            },
            open: async () => {
                $("#toolbox-list-social").removeClass("unrevealed")
                $(".toolbox--selectable--social").addClass("selected")
                await Promise.all($("#toolbox-list-social .toolbox--revealable-social").toArray().map((el, i) => {
                    return UI.toolbox.reveal(el, 100 * i);
                }))
                UI.toolbox.social.opened = true;
            },
            close: async () => {
                await Promise.all($("#toolbox-list-social .toolbox--revealable-social").toArray().reverse().map((el, i) => {
                    return UI.toolbox.unreveal(el, 100 * i);
                }))
                $("#toolbox-list-social").addClass("unrevealed")
                $(".toolbox--selectable--social").removeClass("selected")
                UI.toolbox.social.opened = false;
            },
        },

        // Click here button (alone)
        joinus: {
            opened: false,
            toggle: () => {
                if (UI.toolbox.joinus.opened) UI.toolbox.joinus.close()
                else UI.toolbox.joinus.open()
            },
            open: async () => {
                $("#toolbox-list-joinus").removeClass("unrevealed")
                $(".toolbox--selectable--joinus").addClass("selected")
                await Promise.all($("#toolbox-list-joinus .toolbox--revealable-joinus").toArray().map((el, i) => {
                    return UI.toolbox.reveal(el, 100 * i);
                }))
                UI.toolbox.joinus.opened = true;
            },
            close: async () => {
                await Promise.all($("#toolbox-list-joinus .toolbox--revealable-joinus").toArray().reverse().map((el, i) => {
                    return UI.toolbox.unreveal(el, 100 * i);
                }))
                $("#toolbox-list-joinus").addClass("unrevealed")
                $(".toolbox--selectable--joinus").removeClass("selected")
                UI.toolbox.joinus.opened = false;
            },
        },


        reveal: async (el, delay) => {
            await during(delay)
            $(el).removeClass("unrevealed")
            await during(200)
        },
        unreveal: async (el, delay) => {
            await during(delay)
            $(el).addClass("unrevealed")
            await during(200)
        }
    },
    showToolBox: function(elem, isReversed) {
        var nbEnfant = elem.siblings(".toolBox").children(".toolBox__item").length;
        if (isReversed ^ elem.siblings(".toolBox").hasClass("toolBox--open")) {
            elem.siblings(".toolBox").children(".toolBox__item").each(function(i) {
                $(this).css("transition-delay", i * 0.1 + "s");
                $(this).children(".toolBox__link").children(".icon").css("transition-delay", i * 0.1 + "s");
            });
        } else {
            elem.siblings(".toolBox").children(".toolBox__item").each(function(i) {
                $(this).css("transition-delay", (nbEnfant - i) * 0.1 + "s");
                $(this).children(".toolBox__link").children(".icon").css("transition-delay", (nbEnfant - i) * 0.1 + "s");
            });
        }

        elem.toggleClass("toolBox__link--selected");
        elem.siblings(".toolBox").toggleClass("toolBox--open");
        elem.siblings(".toolBox").find(".toolBox").removeClass("toolBox--open");

        if (elem.hasClass("toolBox__link--selected"))
            elem.attr("data-toolboxenabled", "true");
        else
            elem.attr("data-toolboxenabled", "");
    },
    getHTML: function(bloc) {
        return $('<div />').append(bloc.clone()).html();
    }
}

var SlideShow = {
    init: function() {
        $(".slider").each(function() {
            elemSlider = $(this);
            var slides = $(this).find(".slider__slides");
            var typeSlider = $(this).data("slider-type");
            var infos = SlideShow.getInfos(typeSlider, $(this));
            var directionNavRelativeRef = elemSlider.find(".jsDirectionNavRelativeRef");
            if (infos != null) {
                if (typeSlider == 3) {
                    var cloneDesktop = $(this).clone(true).addClass("noMobile printOnly").removeClass("slider modLayout3");
                    cloneDesktop.find(".slider__directionNav, .slider__pager").remove();
                    cloneDesktop.find('[class*="slider"]').removeClass(function(index, css) {
                        return (css.match(/\bslider\S+/g) || []).join(' ');
                    });
                    cloneDesktop.removeClass(function(index, css) {
                        return (css.match(/\bslider\S+/g) || []).join(' ');
                    });

                    cloneDesktop.insertAfter($(this));
                    $(this).addClass("onlyMobile");

                }
                if (infos.itemsOnResize != undefined) {
                    $(window).on("resize", function() {
                        infos.items.visible = infos.itemsOnResize[Device.getBreakpoint()];
                        slides.trigger("destroy").carouFredSel(infos);
                    });
                    infos.items.visible = infos.itemsOnResize[Device.getBreakpoint()];
                }
                if (infos.buttonOnResize != undefined) {
                    var elem = $(this);
                    $(window).on("resize", function() {
                        elem.find(".slider__directionNav").toggle(infos.buttonOnResize[Device.getBreakpoint()]);
                    });
                    elem.find(".slider__directionNav").toggle(infos.buttonOnResize[Device.getBreakpoint()]);
                }

                /*if (directionNavRelativeRef.length > 0) {
                    SlideShow.directionNavCenterY(elemSlider, directionNavRelativeRef);
                }*/

                slides.carouFredSel(infos);
            }
        });
    },
    getInfos: function(typeSlider, elem) {
        if (typeSlider == "1") {
            return {
                responsive: true,
                height: "variable",
                auto: false,
                items: {
                    height: "variable"
                },
                prev: {
                    button: elem.find(".slider__navPrev")
                },
                next: {
                    button: elem.find(".slider__navNext")
                },
                swipe: {
                    onTouch: true
                },
                onCreate: SlideShow.slideShowOnCreate
            };
        } else if (typeSlider == "2") {
            return {
                circular: true,
                infinite: true,
                width: "100%",
                // responsive: true,
                height: "variable",
                /*itemsOnResize: {
                    "mobile": 1,
                    "tablet": 3,
                    "desktop": 3
                },*/
                buttonOnResize: {
                    "mobile": true,
                    "tablet": false,
                    "desktop": false
                },
                align: "center",
                auto: false,
                items: {
                    // visible: 2,
                    width: "variable",
                    height: "variable"
                },
                prev: {
                    button: elem.find(".slider__navPrev")
                },
                next: {
                    button: elem.find(".slider__navNext")
                },
                pagination: elem.find(".slider__pager"),
                swipe: {
                    onTouch: true
                },
                onCreate: SlideShow.slideShowOnCreate
            };
        } else if (typeSlider == "3") {
            return {
                circular: true,
                infinite: true,
                responsive: true,
                height: "variable",
                itemsOnResize: {
                    "mobile": 1,
                    "tablet": 3,
                    "desktop": 3
                },
                auto: false,
                items: {
                    height: "variable"
                },
                prev: {
                    button: elem.find(".slider__navPrev")
                },
                next: {
                    button: elem.find(".slider__navNext")
                },
                pagination: elem.find(".slider__pager"),
                swipe: {
                    onTouch: true
                },
                onCreate: SlideShow.slideShowOnCreate
            };
        } else if (typeSlider == "4") {
            return {
                circular: true,
                infinite: true,
                responsive: true,
                width: "100%",
                height: "variable",
                items: {
                    height: "variable"
                },
                auto: false,
                pagination: elem.find(".slider__pager"),
                swipe: {
                    onTouch: true
                },
                onCreate: SlideShow.slideShowOnCreate
            };
        } else
            return null;
    },
    directionNavCenterY: function(oSlider, oRelativeElem) {
        var directionNav = oSlider.find(".slider__directionNav");
        var directionNavHeight = directionNav.find(".slider__navPrev").height();
        directionNav.css({
            "margin-top": 0,
            "top": (oRelativeElem.outerHeight() - directionNavHeight) / 2
        });

        $(window).on("resize", function() {
            directionNav.css({
                "top": (oRelativeElem.outerHeight() - directionNavHeight) / 2
            });
        });
    },
    slideShowOnCreate: function() {
        var oSlider = $(this).closest(".slider");
        var directionNavRelativeRef = oSlider.find(".jsDirectionNavRelativeRef");
        if (directionNavRelativeRef.length > 0) {
            SlideShow.directionNavCenterY(oSlider, directionNavRelativeRef);
        }
    }
}

var SlideShowPerso = {
    init: function() {
        SlideShowPerso.listeSlider = $(".slider[data-slider-type='noFred']");

        $(window).on("resize", SlideShowPerso.resize);
        SlideShowPerso.resize();

        SlideShowPerso.listeSlider.each(function() {
            var slider = $(this);
            var pager = slider.find(".slider__pager");

            for (var i = 1; i <= slider.find(".slider__item").length; i++)
                pager.append('<a href="#"' + (i == 1 ? ' class="selected"' : '') + ' style="transition-delay:' + (0.05 * i) + 's"><span>' + i + '</span></a>');

            pager.on("click", "a:not(.selected)", function(e) {
                e.preventDefault();
                SlideShowPerso.action($(this), ($(this).index() < $(this).parents(".slider__pager").find('a.selected').index() ? -1 : 1));
                SlideShowPerso.initBoucle(pager);
            });

            setTimeout(function() {
                pager.find("a").addClass("loaded");
            }, 10);

            slider.find(".slider__slides").swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    var sens = (direction == "right" ? -1 : 1)
                    var index = (slider.find('li.active-img').index() + sens + slider.find('li').length) % slider.find('li').length;
                    SlideShowPerso.action(pager.find('a').eq(index), sens);
                }
            });

            SlideShowPerso.initBoucle(pager);
        });
    },
    action: function(elem, sens) {
        if (elem.parents(".slider").data("isMoving") == "0" || elem.parents(".slider").data("isMoving") == undefined) {
            elem.parents(".slider").data("isMoving", "1");
            SlideShowPerso.goImage(elem.index(), elem.parents(".slider").find(".slider__slides"), sens);
            elem.addClass('selected').siblings().removeClass("selected");
        }
    },
    resize: function() {
        SlideShowPerso.listeSlider.each(function() {
            SlideShowPerso.setHeight($(this).find(".slider__slides"), "css");
        });
    },
    goImage: function(newIndex, parent, sens) {
        parent.find('li.active-img').toggleClass("onRight", sens == -1).toggleClass("onLeft", sens == 1).addClass("toRemove").removeClass("active-img");
        parent.find('li').eq(newIndex).toggleClass("onRight", sens == 1).toggleClass("onLeft", sens == -1);
        setTimeout(function() {
            parent.find('li').eq(newIndex).addClass("withMove active-img");
        }, 1);
        setTimeout(function() {
            parent.find('li').removeClass('toRemove withMove onRight onLeft');
            parent.parents(".slider").data("isMoving", "0");
            SlideShowPerso.setHeight(parent, "animate");
        }, 1700);
    },
    setHeight: function(parent, action) {
        parent[action]({
            "height": SlideShowPerso.getActiveLI(parent).height() + "px"
        });
    },
    getActiveLI: function(parent) {
        return parent.find(".slider__item.active-img");
    },
    initBoucle: function(pager) {
        if (SlideShowPerso.boucle != undefined)
            clearInterval(SlideShowPerso.boucle);
        SlideShowPerso.boucle = setInterval(function() {
            var nextIndex = (pager.find("a.selected").index() + 1 + pager.find("a").length) % pager.find("a").length;
            var bouton = pager.find("a").eq(nextIndex);
            SlideShowPerso.action(bouton, (bouton.index() < bouton.parents(".slider__pager").find('a.selected').index() ? -1 : 1));
        }, 5000);
    }
}


var GridWall = {
    listeGrid: {
        // Wall for Article list (Used for Page Medias article list)
        /*".gridWall.pushBoxList1": {
            itemSelector: '.gridWall__item',
            percentPosition: true,
            masonry: {
                columnWidth: '.gridWall__sizer',
                gutter: '.gridWall__gutterSizer'
            }
        },*/
        // Wall Social (Used for Home social wall)
        ".gridWall.cardBoxList4": {
            itemSelector: '.gridWall__item',
            masonry: {
                columnWidth: '.gridWall__sizer',
                percentPosition: true
            }
        }
    },
    init: function() {
        for (var key in GridWall.listeGrid) {
            $(key).each(function() {
                var elGridWall = $(this).isotope(GridWall.listeGrid[key]);
                elGridWall.imagesLoaded().progress(function() {
                    elGridWall.isotope('layout');
                });
                $(this).data("isotop", elGridWall);
            });
        }
    }
}

var Cookie = {
    init: function() {
        $('.alert__picto span').click(function() {
            $('.alert').hide();
        });
    }
}

var MosaicWall = {
    init: function() {
        var elWall = $(".mosaicWall");
        MosaicWall.panels = elWall.find(".panels__item");
        MosaicWall.boxs = $(".mosaicList1__box");
        MosaicWall.navTabs = elWall.find(".mosaicWall__nav li");
        MosaicWall.clickEnabled = true;
        MosaicWall.zIndex = 1;

        MosaicWall.panels.eq(0).css({
            "z-index": MosaicWall.zIndex
        });
        MosaicWall.zIndex++;

        $(window).on("resize", MosaicWall.resize);
        MosaicWall.resize();

        MosaicWall.navTabs.on("click", function(e) {
            e.preventDefault();

            if (!Device.isMobile) {
                if ((!$(this).find("a").hasClass("navFourth__link--active")))
                    MosaicWall.showTab($(this), false);
            } else {
                var links = $(this).siblings().find("a");
                if ($(this).find("a").hasClass("navFourth__link--active")) {
                    console.log("Click Tab is already active");
                    if (links.filter("[style]").length == 0)
                        links.css("display", "block");
                    else
                        links.removeAttr("style");
                } else {
                    MosaicWall.showTab($(this), true);
                    links.removeAttr("style");
                }
            }
        });
    },
    showTab: function(elem) {
        if (MosaicWall.clickEnabled) {
            MosaicWall.clickEnabled = false;
            MosaicWall.navTabs.find("a").removeClass("navFourth__link--active");
            elem.find("a").addClass("navFourth__link--active");

            var currentPanel = MosaicWall.panels.eq(elem.index()).css({
                "z-index": MosaicWall.zIndex
            }).addClass("panels__item--active");
            setTimeout(function() {
                MosaicWall.panels.not(currentPanel).removeClass("panels__item--active");
                MosaicWall.clickEnabled = true;
            }, 500);

            MosaicWall.zIndex++;
        }
    },
    /*showTab: function (elem, isMobile) {
        if (! isMobile) {
            if (MosaicWall.clickEnabled) {
                MosaicWall.clickEnabled = false;
                MosaicWall.navTabs.find("a").removeClass("navFourth__link--active");
                elem.find("a").addClass("navFourth__link--active");

                var currentPanel = MosaicWall.panels.eq(elem.index()).css({ "z-index": MosaicWall.zIndex }).addClass("panels__item--active");
                setTimeout(function () {
                    MosaicWall.panels.not(currentPanel).removeClass("panels__item--active");
                    MosaicWall.clickEnabled = true;
                }, 500);

                MosaicWall.zIndex++;
            }
        } else {
            MosaicWall.navTabs.find("a").removeClass("navFourth__link--active");
            elem.find("a").addClass("navFourth__link--active");
            var currentPanel = MosaicWall.panels.eq(elem.index()).css({ "z-index": MosaicWall.zIndex }).addClass("panels__item--active");
            MosaicWall.panels.not(currentPanel).removeClass("panels__item--active");
            MosaicWall.clickEnabled = true;
        }
        
    },*/
    resize: function() {
        if (Device.isMobile)
            MosaicWall.boxs.css("transition", "none");
        else
            MosaicWall.boxs.css("transition", "");
    }
}

var Popin = {
    init: function() {
        $(".jsTriggerPopin").on("click", function(e) {
            e.preventDefault();
            Popin.openPopin($(this).data("popin-id"));
        });

        $(".jsTriggerPopinForm").on("click", function(e) {
            e.preventDefault();
            $(".popinOverlay").fadeIn("fast");
            $("#popinFormContact").fadeIn("fast");
            $(document).scrollTop(0);
        });

        $('body').on("click", ".jsTriggerClosePopin, .popin__btnClose", function() {
            Popin.closePopin($(this).closest(".popin"));
        });
    },

    openPopin: function(elemID) {
        $(".popinOverlay").fadeIn("fast");
        $("#" + elemID).fadeIn("fast");

        if ($("#" + elemID).hasClass("popin--search"));
        $(document).scrollTop(0);
    },

    closePopin: function(elem) {
        elem.fadeOut("fast");
        $(".popinOverlay").fadeOut("fast");
    }
}

var YoutubePlaceholder = {
    init: function() {
        $(".videoBox__placeHolder").each(function() {
            $(this).append("<span class='videoBox__play'></span><span class='videoBox__playHover'></span>");
        });
        $("body").on("click", ".videoBox__play", function() {
            $(this).fadeOut();
            $(this).parents(".videoBox").eq(0).find(".videoBox__caption").animate({
                "left": "-100%"
            });
            var placeHolder = $(this).parents(".videoBox__placeHolder").eq(0);
            if (tarteaucitron.state.ytIframe == true) {
                console.log('youtube cookies yes');
                var youtubeCode = '<iframe width="' + placeHolder.data("width") + '" height="' + placeHolder.data("height") + '" src="https://www.youtube.com/embed/' + placeHolder.data("video") + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
            } else {
                console.log('youtube cookies nope');
                var youtubeCode = '<div class="youtube_player" videoID="' + placeHolder.data("video") + '" width="' + placeHolder.data("width") + '" height="' + placeHolder.data("height") + '" rel="0" autoplay="1">';
                youtubeCode += '<div class="tac_activate">';
                youtubeCode += '<div class="tac_float">';
                youtubeCode += '<b>Youtube</b> ' + tarteaucitron.lang.fallback;
                youtubeCode += '<div class="tarteaucitronAllow" id="' + placeHolder.data("video") + '" onclick=\'tarteaucitron.state.ytIframe = true; $(".videoBox__play").click();\'>Autoriser</div>';
                youtubeCode += '</div>';
                youtubeCode += '</div>';
                youtubeCode += '</div>';
            }
            placeHolder.find("img").fadeOut();
            placeHolder.append(youtubeCode);

        });
    }
}

var Lexique = {
    lastLetter: 'A',
    init: function() {
        Lexique.lexiqueAlphabet = $(".lexiqueAlphabet");
        Lexique.lexiqueAlphabetMobile = $(".lexiqueAlphabet.lexique__mobile");
        Lexique.lexiqueAlphabetDesktop = $(".lexiqueAlphabet.lexique__desktop");
        var yOffsetDiffDesktop = $('.navPrimary__list').height() + 45;
        var yOffsetDiffMobile = $('.lexique__mobile').height() + 90;
        var yOffsetDiff;
        Lexique.hideLetters();

        // Lexique scrolling
        $('.lexique a').click(function() {
            if ($($(this).attr('href')).length > 0) {

                if (!Device.isMobile) {
                    yOffsetDiff = yOffsetDiffDesktop;
                } else {
                    yOffsetDiff = yOffsetDiffMobile;
                }
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - yOffsetDiff
                }, 400);
                event.preventDefault();
            }
        });

        // Lexique fixe
        if ($(".lexique").length > 0) {
            $(window).scroll(Lexique.setMenu);
            Lexique.setMenu();
            $(window).scroll(Lexique.checkLetter);
            Lexique.checkLetter();
        }
    },
    hideLetters: function() {
        $(".lexiqueAlphabet__letters a").each(function() {
            var isPresent = false;
            var parent = $(this).parent();
            var letter1 = $.trim($(this).text());
            $("dt.lexiqueListDefinition__letters").each(function() {
                var letter2 = $.trim($(this).text())
                if (letter1 == letter2) {
                    isPresent = true;
                    return false;
                }
            });
            if (!isPresent) {
                $(this).remove();
                parent.append("<span>" + letter1 + "</span>");
                parent.addClass("lexiqueAlphabet__letters--disabled");
            }
        });
    },
    setMenu: function() {
        var lexique = $('.lexique');
        lexique.toggleClass('lexique--fixed', $(this).scrollTop() > lexique.offset().top && ($(this).scrollTop() <= lexique.offset().top + lexique.height() - $(window).height() / 2 || Device.isMobile));
        $(".lexiqueAlphabet").toggleClass('lexiqueAlphabet__fixed', $(this).scrollTop() > lexique.offset().top - 120 && ($(this).scrollTop() <= lexique.offset().top + lexique.outerHeight() - Lexique.lexiqueAlphabetDesktop.outerHeight() - 0.13 * $(window).height() - 40 || Device.isMobile));
        $(".lexiqueAlphabet").toggleClass('lexiqueAlphabet__notFixedBottom', !Device.isMobile && $(this).scrollTop() > lexique.offset().top + lexique.outerHeight() - Lexique.lexiqueAlphabetDesktop.outerHeight() - 0.13 * $(window).height() - 40);
    },
    checkLetter: function() {
        var currentLettre = "A";
        var currentScroll = $(document).scrollTop() + $(window).height() * 0.2;
        if (Device.isMobile)
            currentScroll = $(document).scrollTop() + $(window).height() * 0.35;
        var listeLettres = $(".lexiqueListDefinition__letters");
        listeLettres.each(function() {
            if (currentScroll > $(this).offset().top) {
                currentLettre = $.trim($(this).text());
                return;
            }
        });
        Lexique.lexiqueAlphabet.find("a").removeClass("lexiqueAlphabet__active");
        Lexique.lexiqueAlphabet.find("a[href='#section" + currentLettre + "']").addClass("lexiqueAlphabet__active");
        if (Lexique.lastLetter != currentLettre) {
            Lexique.lastLetter = currentLettre;
            Lexique.lexiqueAlphabetMobile.stop().animate({
                "scrollLeft": Lexique.lexiqueAlphabetMobile.find("a[href='#section" + currentLettre + "']").offset().left - 40 - Lexique.lexiqueAlphabetMobile.children().eq(0).offset().left
            });
        }
    }
}

var Timeline = {
    init: function() {
        if (!$(".timeline").length > 0)
            return;

        Timeline.index = $(".timeline__Index");
        Timeline.barre = $(".timeline__Barre");
        Timeline.jauge = $(".timeline__BarreJeton");
        Timeline.contenu = $(".timeline__Contenu");

        Timeline.index.find("li").each(function() {
            $(this).find("p").attr("data-year", $(this).data("year"));
        });

        if ($(".timeline").length > 0) {
            $(window).scroll(Timeline.setMenu);
            Timeline.setMenu();
            $(window).scroll(Timeline.checkIndex);
            Timeline.checkIndex();
        }

        Timeline.index.find("a").on("click", function(e) {
            e.preventDefault();
            if (Device.isMobile)
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - ($('.headerMain__inner').height() + Timeline.index.outerHeight())
                }, 400);
            else if (Device.isTablette)
                // $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - ($('.headerMain__inner').height() + Timeline.barre.outerHeight()) }, 400);
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - ($('.headerMain__inner').height())
                }, 400);
            else
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - $('.navPrimary__list').height() - 40
                }, 400);
        });

        $(window).on("resize", Timeline.resize);
        Timeline.resize();
    },
    setMenu: function() {
        var timeline = $('.timeline');
        timeline.toggleClass('timeline--fixed', $(this).scrollTop() + 80 > timeline.offset().top && ($(this).scrollTop() <= timeline.offset().top + timeline.height() - $(window).height() || Device.isMobile));
        Timeline.index.toggleClass('timeline__Index--fixed', $(this).scrollTop() + 80 > timeline.offset().top && ($(this).scrollTop() <= timeline.offset().top + timeline.height() - $(window).height() || Device.isMobile));
        Timeline.index.toggleClass('timeline__Index--notFixedBottom', !Device.isMobile && $(this).scrollTop() > timeline.offset().top + timeline.height() - $(window).height());

        // Timeline.barre.toggleClass('timeline__Barre--fixed', $(this).scrollTop() + 140 > timeline.offset().top || Device.isMobile);

        var position = 100 * $(document).scrollTop() / ($(document).height() - $(window).height());
        if (position > 95)
            position = 95;
        Timeline.jauge.css("left", position + "%");
    },
    checkIndex: function() {
        var currentID = "";
        var currentScroll = $(document).scrollTop() + $(window).height() / 2;
        if (Device.isMobile)
            currentScroll = $(document).scrollTop() + $(window).height() * 0.35;

        Timeline.contenu.children().each(function() {
            if (currentScroll > $(this).offset().top) {
                var elem = $(this);
                currentID = elem.attr("id");
                if (Device.isMobile && !elem.is("h2"))
                    currentID = elem.prevAll("h2").attr("id");
                return;
            }
        });
        Timeline.index.find("p[data-year]").removeClass("selected");
        var currentP = Timeline.index.find("a[href='#" + currentID + "']").parent();
        if (Device.isMobile && currentP.index() != 0)
            currentP.parent().find(".annee").addClass("selected");
        else if (currentP.index() == 1)
            currentP.prev().addClass("selected");
        else
            currentP.addClass("selected");

        currentP = Timeline.index.find("p.selected");
        if (!currentP.is(Timeline.lastSelectedIndex)) {
            Timeline.lastSelectedIndex = currentP;
            if (currentP.length > 0) {
                var yPos = currentP.position().top - 20;
                if (!Device.isMobile) {
                    // Custom ScrollBar animation
                    Timeline.index.data('jsp').scrollToY(yPos);
                } else {
                    Timeline.index.scrollTop(yPos);
                }
            }
            if (Device.isMobile && currentP.length > 0) {
                Timeline.index.stop().animate({
                    "scrollLeft": currentP.offset().left - Timeline.index.children().eq(0).offset().left
                });
                //Timeline.index.scrollLeft(currentP.offset().left - Timeline.index.children().eq(0).offset().left);
            }
        }
    },
    resize: function() {
        if (Device.isMobile) {
            CustomScrollBar.destroyScroll(Timeline.index);
        } else {
            CustomScrollBar.buildScroll(Timeline.index);
        }
    }
}

var Informations = {
    init: function() {
        // Delay added for WP plugin tablePress to initialize
        setTimeout(function() {
            $('.informationsReglementees__list').hide();
        }, 100)


        $('.informationsReglementees__title').each(function() {
            $(this).click(function() {
                $(this).parent().find('.informationsReglementees__list').toggleClass('informationsReglementees__list__active');
                $(this).parent().find('.button').toggleClass('button__rotate');
                $(this).next().slideToggle();
            });
        });

        //$(".informationsReglementees__accordions.withYear").each(function () {
        //    var liste = $(this).find("li.informationsReglementees__elements").addClass("old");
        //    var ulParent = $(this).find(".informationsReglementees__list");

        //    var lastDate = "";
        //    var lastLI;
        //    liste.each(function () {
        //        var currentDate = $(this).data("year");
        //        if (lastDate != currentDate) {
        //            lastDate = currentDate;
        //            lastLI = $("<li class='informationsReglementees__elements informationsReglementees__elements--theme2' />");
        //            lastLI.append("<h2 class='informationsReglementees__elements__title'> " + currentDate + " </h2>");
        //            ulParent.append(lastLI);
        //        }
        //        lastLI.append($(this).html());
        //    });
        //    ulParent.find("li.old").remove();
        //});
    }
}

var Publication = {
    init: function() {
        $(".listePublications table").each(function() {
            var divParent = $("<div class='divTable onlyMobile'></div>");
            $(this).find("tbody").find("tr").each(function() {
                var dataYear = $(this).attr("data-year");
                var divParent2 = $("<div class='divTableItem' data-year='" + dataYear + "'></div>");
                $(this).find("td").each(function(i) {
                    var currentClass = "divHead";
                    var Category = "";

                    if (i != 0) {
                        currentClass = "divCell";
                        Category = $(this).parents("table").eq(0).find("thead").find("td").eq(i).html();
                        var thisLine = $("<div class='" + currentClass + "'>" + Category + "<br/>" + $(this).html() + "</div>");
                    } else {
                        var thisLine = $("<div class='" + currentClass + "'>" + Category + $(this).html() + "</div>");
                    }
                    divParent2.append(thisLine);

                    if ($(this).is(':empty')) {
                        thisLine.remove();
                    }
                });
                divParent.append(divParent2);
            });
            divParent.insertAfter($(this));

            Publication.selectedYear = $(".selectYearPublications").val();
            Publication.selectedType = $(".selectTypePublications").val();
        });

        $(".selectYearPublications").on("change", function() {
            Publication.selectedYear = $(this).val();
            $(".selectYearPublications").val(Publication.selectedYear);
            Publication.checkTableHasResults();
        });

        $(".selectTypePublications").on("change", function() {
            Publication.selectedType = $(this).val();
            $(".selectTypePublications").val(Publication.selectedType);
            Publication.checkTableHasResults();
        });

        $(".selectYearPublications").trigger("change");
    },
    checkTableHasResults: function() {
        if (Publication.selectedYear == "0") {
            $(".listePublications").find(".table1__line, .divTableItem").addClass("selected").show();
        } else {
            $(".listePublications").find(".table1__line, .divTableItem").removeClass("selected").hide();
            $(".listePublications").find(".table1__line[data-year='" + Publication.selectedYear + "'], .divTableItem[data-year='" + Publication.selectedYear + "']").addClass("selected").show();
        }

        if (Publication.selectedType == "0") {
            $(".listePublications").find(".publications").show();
        } else {
            $(".listePublications").find(".publications").hide();
            $(".listePublications").find(".publications[data-type='" + Publication.selectedType.replace(/'/g, "\\'") + "']").show();
        }

        $(".listePublications").find(".publications:visible").each(function() {
            if ($(this).find(".table1__line, .divTableItem").length > 0) {
                var thisVisible = ($(this).find(".table1__line.selected, .divTableItem.selected").length > 0 ? true : false);
                if (!thisVisible) {
                    $(this).hide();
                    $(this).prev().hide();
                }
            }
        });
    }
}

var OtherSites = {
    init: function() {
        OtherSites.selectedBrandCategory = $(".jsSelectBrandCategory").val();
        OtherSites.selectedCountry = $(".jsSelectCountrySites").val();
        console.log("OtherSites.selectedBrandCategory onInit: " + OtherSites.selectedBrandCategory);

        if ($(".otherSites").length > 0) {
            $(".jsSelectBrandCategory").on("change", function() {
                OtherSites.selectedBrandCategory = $(this).val();
                $(".jsSelectBrandCategory").val(OtherSites.selectedBrandCategory);

                OtherSites.checkResults();
            });

            $(".jsSelectBrandCategory").trigger("change");

            $(".jsSelectCountrySites").on("change", function() {
                OtherSites.selectedCountry = $(this).val();
                $(".jsSelectCountrySites").val(OtherSites.selectedCountry);

                OtherSites.checkResults();
            });

            //redirect websites     
            $(".jsSelectBrandCountry").each(function() {
                var mySelect = $(this);
                var sDataCountry = mySelect.find("option:selected").data("country");
                mySelect.attr("data-country-selected", sDataCountry);

                mySelect.on("change", function(e) {
                    var url_value = $(this).val();
                    $(this).val(url_value);
                    var bIsOldSelectedCountry = (mySelect.find("option:selected").data("country") == mySelect.data("country-selected") ? true : false);

                    if (url_value !== "0" && bIsOldSelectedCountry === false) {
                        if (!Device.isIOS) {
                            $(this).selectric("init");
                            OtherSites.gotoURL(url_value);
                        } else {
                            document.location = url_value;
                        }
                        mySelect.data("country-selected", mySelect.find("option:selected").data("country"));
                    }
                });
            });
        }
    },
    checkResults: function() {
        if (OtherSites.selectedBrandCategory == "0" && OtherSites.selectedCountry == "0") {
            $(".otherSites").find(".cardBox4").parent().show();
        } else {
            $(".otherSites").find(".cardBox4").each(function() {
                var myBrandCard = $(this);
                var mySelect = myBrandCard.find(".jsSelectBrandCountry");
                var aBrandCategories = myBrandCard.data("category-brand").split(",");

                var hasSelectedBrandCategory = function() {
                    for (var i = 0; i < aBrandCategories.length; i++) {
                        if (aBrandCategories[i] === OtherSites.selectedBrandCategory || OtherSites.selectedBrandCategory === "0") {
                            return true;
                        }
                    }
                    return false;
                }
                var hasSelectedCountry = (mySelect.find('option[data-country="' + OtherSites.selectedCountry + '"]').length > 0 || OtherSites.selectedCountry == "0" ? true : false);

                if (hasSelectedBrandCategory() && hasSelectedCountry) {
                    myBrandCard.parent().show();
                } else {
                    myBrandCard.parent().hide();
                }
            });
        }
    },
    gotoURL: function(sURL) {
        window.open(sURL, '_blank');
    },
}


var TestVue = {
    currentResult: {
        "question1": {
            "gauche": true,
            "droit": true
        },
        "question2": {
            "gauche": true,
            "droit": true
        },
        "question3": {
            "gauche": true,
            "droit": true
        },
        "question4": {
            "both": true
        },
        "question5": {
            "both": true
        },
        "question6": {
            "both": true
        },
        "question7": {
            "gauche": true,
            "droit": true
        },
        "question1_statut": "todo",
        "question2_statut": "todo",
        "question3_statut": "todo",
        "question4_statut": "todo",
        "question5_statut": "todo",
        "question6_statut": "todo",
        "question7_statut": "todo"
    },
    sliderDone: false,
    currentQuestion: "question1",
    init: function() {
        //Si Mobile : on affiche pas la page de consigne
        TestVue.checkNavMobile();
        TestVue.bloc = document.querySelector(".testVue");

        var keyAcuite = new TestKeyboard($(".testVue__acuite"), 6);
        var keyContraste = new TestKeyboard($(".testVue__contraste2"), 10);
        $.ajax({
            url: (typeof(main) != "undefined" ? main.theme_directory + "/" : "") + "js/testvue.json",
            dataType: "json"
        }).done(function(data) {
            TestVue.currentLabel = data;

            //Init de la Page1
            if (TestVue.currentResult["question1_statut"] == "done") {
                TestVue.getFinal($('.testVue__onglet__active .testVue__page.withFinal'));
            }

        });

        //Init Cookie
        if ($.cookie("infosTestVue") != undefined)
            TestVue.currentResult = JSON.parse($.cookie("infosTestVue"));

        // Starting Page
        $('.buttonStartingPage').click(function() {
            if ($('#optIn_newsletter').is(':checked')) {
                $('.testVue-startingPage').css({
                    'top': '-199em'
                });
                TestVue.checkScroll();
            } else {
                $('.testVue-startingPage__clause__alerteMessage').addClass('testVue-startingPage__clause__alerteMessage__active')
            }

            keyAcuite.refresh();
            keyContraste.refresh();
        });

        // Pop In & overlay
        $('.button-popIn, .testVue-popIn__icon').click(function() {
            $('.testVue-popIn, .testVue-popIn__icon').toggleClass('testVue-popIn__active');

            // Overlay
            if ($('.testVue-popIn').hasClass('testVue-popIn__active')) {
                $('.testVue').append('<div class="testVue-popIn__overlay"></div>');
            } else {
                $('.testVue-popIn__overlay').removeClass('testVue-popIn__overlay')
            };
        });

        $(".testVue__popinLuminosite__button").on("click", function() {
            $(this).parents(".testVue__popinLuminosite").eq(0).removeClass("testVue__popinLuminosite--visible");
        });

        //Gestion du champs input de Color Vision : que des chiffres ou un X.
        $(".testVue__pageCouleur__lineInput input").on("keyup", function(e) {
            var value = $(this).val();
            var newValue = "";
            for (var i = 0; i < value.length; i++) {
                if ("0123456789Xx".indexOf(value[i]) > -1) {
                    newValue += value[i];
                }
            }
            $(this).val(newValue);
        })

        // Navigation Onglet
        $('button.form__btnSubmit, .testVue .navFourth__list li').click(function() {
            var parentMenu = null;
            if ($(this).parent().hasClass("navFourth__list")) {
                parentMenu = $(this).parent().get(0);
            }

            var buttonId = $(this).data('onglet');

            if (Device.isMobile && ("question" + buttonId.replace("tab", "") == TestVue.currentQuestion) && !$(".testVue__tab").hasClass("testVue__tab--invisMobile")) {
                parentMenu.classList.toggle("navFourth__list--open");
            } else {

                TestVue.currentQuestion = "question" + buttonId.replace("tab", "");

                $('.testVue__tab').fadeOut('fast', function() {
                    $(".testVue__tab").removeClass("testVue__tab--invisMobile");
                    $('.testVue__onglet').removeClass('testVue__onglet__active');
                    $('.testVue__onglet[data-panel="' + buttonId + '"]').addClass('testVue__onglet__active');
                    $('.testVue__tab').fadeIn('fast', function() {

                        if ($('.testVue__onglet__active').hasClass('testVue__contraste')) {
                            var $eleslider = document.getElementById('sliderContraste');
                            var $contrasteImg = $('.contraste__img');

                            if (!TestVue.sliderDone) {
                                TestVue.sliderDone = true;
                                noUiSlider.create($eleslider, {
                                    start: 0.5,
                                    range: {
                                        'min': 0,
                                        'max': 1
                                    }
                                });
                                $eleslider.noUiSlider.on('slide', function(values, handle) {
                                    var $valueSlide = values[handle];
                                    $contrasteImg.css('opacity', $valueSlide);
                                });
                            }
                        }

                        if ($('.testVue__onglet__active').hasClass('testVue__contraste2')) {
                            $(".testVue__popinLuminosite").addClass("testVue__popinLuminosite--visible");
                        }
                    });

                    var statut = TestVue.currentResult[TestVue.currentQuestion + "_statut"];
                    $('.testVue__onglet__active .testVue__page--active').removeClass("testVue__page--active").parent().children().first().addClass("testVue__page--active");

                    TestVue.checkNavMobile();

                    if (statut == "done")
                        TestVue.getFinal($('.testVue__onglet__active .testVue__page.withFinal'));

                });
                $('.testVue .navFourth__list li').each(function() {
                    if ($(this).find('.navFourth__link').hasClass('navFourth__link--active')) {
                        $(this).find('.navFourth__link').removeClass('navFourth__link--active');
                        $('.navFourth__list li[data-onglet="' + buttonId + '"]').find('.navFourth__link').addClass('navFourth__link--active');

                        $(this).removeClass("navFourth__item--active");
                        $('.navFourth__list li[data-onglet="' + buttonId + '"]').addClass('navFourth__item--active');
                    }
                });

                keyAcuite.refresh();
                keyContraste.refresh();
                TestVue.checkScroll();

                if (parentMenu) {
                    parentMenu.classList.remove("navFourth__list--open");
                }
            }
        });


        // Add valid icon navigation
        /*$('button.form__btnSubmit').each(function () {
            var buttonId = $(this).data('onglet');
            $(this).click(function () {
                $('.testVue .navFourth__item[data-onglet="tab' + (parseInt(buttonId.replace("tab", "")) - 1) + '"]').find('.testVue-nav__iconOngletValid').addClass('testVue-nav__iconOngletValid__active');
            });
        });*/

        // Navigation page in onglet
        $("body").on("click", '.buttonNextPage:not(.disable):not(.submitObligatoryAnswer)', function() {
            //Recuperation de la reponse
            var currentLI = $('.testVue__onglet__active .testVue__page--active').last();
            var currentLIParent = currentLI.parents("li").eq(0);

            if (currentLI.hasClass("withQuestionTexte")) {
                var currentType = currentLI.data("type");
                var currentInput = currentLI.find(".testVue__pageCouleur__lineInput > input");
                var answer = currentInput.val();
                var goodAnswer = "" + currentInput.data("result");
                var currentAnswer = (answer.toLowerCase() == goodAnswer.toLowerCase());
                TestVue.currentResult[TestVue.currentQuestion][currentType] = (currentLI.hasClass("firstQuestion") ? true : TestVue.currentResult[TestVue.currentQuestion][currentType]) && currentAnswer;

                if (true) {
                    var popin = document.createElement("div");
                    popin.classList.add("testVue__pageCouleur__popin");

                    var popinBox = document.createElement("div");
                    popinBox.classList.add("testVue__pageCouleur__popinBox");
                    popin.appendChild(popinBox);

                    var popinTitre = document.createElement("p");
                    popinTitre.innerHTML = (currentAnswer ? currentLIParent.data("messageok") : currentLIParent.data("messageko"))
                    popinTitre.classList.add("testVue__pageCouleur__popinTitre");
                    popinBox.appendChild(popinTitre);

                    var popinTexte = document.createElement("p");
                    popinTexte.innerHTML = currentInput.data("message").replace("|", "<br\>");
                    popinTexte.classList.add("testVue__pageCouleur__popinTexte");
                    popinBox.appendChild(popinTexte);

                    var popinBouton = document.createElement("p");
                    popinBouton.classList.add("testVue__pageCouleur__popinBouton");
                    popinBouton.innerHTML = "<button class='btn1 btnSlidingBg buttonNextPage' type='submit'><span class='btn1__txt'>" + currentLIParent.data("bouton") + "</span></button>";
                    popinBox.appendChild(popinBouton);

                    var popinTrueBouton = popinBouton.querySelector("button");
                    popinTrueBouton.popin = popin;

                    popinTrueBouton.addEventListener("click", function() {
                        $(this.popin).remove()
                        $('.testVue__onglet__active .testVue__page--active').next().addClass('testVue__page--active').prev().removeClass('testVue__page--active');

                        var currentLI = $('.testVue__onglet__active .testVue__page--active');
                        if (currentLI.hasClass("withFinal")) {
                            TestVue.getFinal(currentLI, true);
                        }
                    })

                    currentLI.append(popin);
                } else {
                    $('.testVue__onglet__active .testVue__page--active').next().addClass('testVue__page--active').prev().removeClass('testVue__page--active');
                }
            } else {
                if (currentLI.hasClass("withQuestion")) {
                    var currentType = currentLI.data("type");
                    var currentAnswer = true;

                    if ($(this).find(".btnAnswer").length == 1)
                        currentAnswer = ($(this).find(".btnAnswer").data("value") == "ok");
                    else {
                        currentLI.find(".btnAnswer:checked").each(function() {
                            currentAnswer = currentAnswer && ($(this).data("value") == "ok");
                        });
                    }
                    TestVue.currentResult[TestVue.currentQuestion][currentType] = (currentLI.hasClass("firstQuestion") ? true : TestVue.currentResult[TestVue.currentQuestion][currentType]) && currentAnswer;
                }
                $('.testVue__onglet__active .testVue__page--active').next().addClass('testVue__page--active').prev().removeClass('testVue__page--active');
            }

            TestVue.checkScroll();
        });

        $('.buttonPrevPage').click(function() {
            $(".testVue__pageCouleur__lineInput input").val("");
            $('.testVue__onglet__active .testVue__page').removeClass('testVue__page--active').eq(0).addClass('testVue__page--active');

            TestVue.checkNavMobile();
            TestVue.checkScroll();

            for (var key in TestVue.currentResult[TestVue.currentQuestion])
                TestVue.currentResult[TestVue.currentQuestion][key] = true;
        });

        //
        $("body").on("click", '.buttonNextPage:not(.disable)', function() {
            // Overlay
            if ($('.testVue__page--active').hasClass('testVue__pageNextEyeOverlay')) {
                $('.testVue__onglet__active .testVue__page--active').prev().addClass('testVue__page--active');
                setTimeout(function() {
                    $('.testVue-nextEye').addClass('testVue-nextEye__active');
                }, 0);

                $('.testVue').append('<div class="testVue-popIn__overlay"></div>');
            } else {
                $('.testVue-nextEye').removeClass('testVue-nextEye__active');
                $('.testVue-popIn__overlay').removeClass('testVue-popIn__overlay')
            };

            var currentLI = $('.testVue__onglet__active .testVue__page--active');
            if (currentLI.hasClass("withFinal")) {
                TestVue.getFinal(currentLI, true);
            }

        });


        // Cochez avant de valider (multiple réponse)
        $('.submitObligatoryAnswer').click(function() {

            var NombreReponse = $(this).parents('.withObligatoryAnswer').find('.testVue__pageContenu__question__btn').length;

            var inputRadios = $(this).parents('.withObligatoryAnswer').find('input[type="radio"]');
            var inputTextes = $(this).parents('.withObligatoryAnswer').find('input[type="text"]');

            var trueReponse = 0;
            for (var i = 0; i < inputRadios.length; i++) {
                trueReponse += (inputRadios.eq(i).is(":checked") ? 1 : 0);
            }
            for (var i = 0; i < inputTextes.length; i++) {
                trueReponse += (inputTextes.eq(i).val() != "" ? 1 : 0);
            }

            if (trueReponse == NombreReponse) {
                $(this).removeClass('submitObligatoryAnswer');
                $('.needObligatoryAnswer').removeClass('_on');
            } else {
                $(this).addClass('submitObligatoryAnswer');
                $('.needObligatoryAnswer').addClass('_on');
            }
        });


        $(document).keydown(function(e) {
            var elem = $(".testVue__pageContenu__acuiteVisuelle:visible, .testVue__pageContenu__sensibContraste:visible");
            if (elem.length > 0 && elem.parents(".withQuestion").length > 0 && e.which >= 37 && e.which <= 40)
                e.preventDefault();
        });

        $(document).keyup(function(objEvent) {
            var elem = $(".testVue__pageContenu__acuiteVisuelle:visible, .testVue__pageContenu__sensibContraste:visible");
            if (elem.length > 0 && elem.parents(".withQuestion").length > 0) {
                var code = "";
                if (objEvent.which == 37)
                    code = "left";
                else if (objEvent.which == 39)
                    code = "right";
                else if (objEvent.which == 38)
                    code = "up";
                else if (objEvent.which == 40)
                    code = "down";
                if (code != "")
                    elem.find("." + elem.attr("class") + "__" + code).click();
            }
        })

        //Ajout du bouton d'info
        var pageContenus = document.querySelectorAll(".testVue__pageContenu");
        for (var i = 0; i < pageContenus.length; i++) {
            var btnInfo = document.createElement("div");
            btnInfo.pageContenu = pageContenus[i];
            btnInfo.classList.add("testVue__btnInfo");
            var btnInfoLabel = document.createElement("span");
            btnInfoLabel.innerHTML = "i";
            btnInfo.appendChild(btnInfoLabel);
            pageContenus[i].appendChild(btnInfo);

            btnInfo.addEventListener("click", function() {
                var parent = this.pageContenu.parentElement;
                parent.querySelector(".testVue-consigneSidebar").classList.remove("testVue-consigneSidebar--invisibleMobile");
                this.pageContenu.classList.remove("testVue__pageContenu--visibleMobile");
                TestVue.checkScroll();
            })

            var divCopyright = document.createElement("div");
            divCopyright.classList.add("testVue__another_copyright");
            var oneCopyright = document.querySelector(".icon-essilor_copyright");
            var texte = "© Essilor 2015";
            if (oneCopyright) {
                texte = oneCopyright.innerHTML;
            }
            divCopyright.innerHTML = texte;
            pageContenus[i].appendChild(divCopyright);
        }

        var pageInstructions = document.querySelectorAll(".testVue-consigneSidebar");
        for (var i = 0; i < pageInstructions.length; i++) {
            var btnNext = document.createElement("button");
            btnNext.pageInstruction = pageInstructions[i];
            btnNext.classList.add("btn1");
            btnNext.classList.add("testVue__btnStart");
            var btnNextLabel = document.createElement("span");
            btnNextLabel.classList.add("btn1__txt");
            btnNextLabel.innerHTML = TestVue.bloc.dataset.bouton;
            btnNext.appendChild(btnNextLabel);
            pageInstructions[i].appendChild(btnNext);

            btnNext.addEventListener("click", function() {
                var parent = this.pageInstruction.parentElement;
                this.pageInstruction.classList.add("testVue-consigneSidebar--invisibleMobile");
                parent.querySelector(".testVue__pageContenu").classList.add("testVue__pageContenu--visibleMobile");
                TestVue.checkScroll();
            })
        }
    },
    checkScroll: function() {
        if (Device.isMobile) {
            var currentScroll = $("html").scrollTop() + $("body").scrollTop();
            $("html, body").scrollTop(currentScroll + TestVue.bloc.getBoundingClientRect().top - 60);
        }
    },
    checkNavMobile: function() {
        if (Device.isMobile) {
            var onglets = $(".testVue__page--active");
            onglets.each(function() {
                if ($(this).find(".testVue-consigne").length > 0) {
                    $(this).removeClass("testVue__page--active");
                    $(this).next().addClass("testVue__page--active");
                }
            })
        }
    },
    getFinal: function(currentLI, isFinal) {
        if (isFinal == undefined)
            isFinal = false;

        var answers = TestVue.currentResult[TestVue.currentQuestion];
        var labelAnswer = "";
        if (answers.both != undefined)
            labelAnswer = (answers.both ? "both" : "none");
        else
            labelAnswer = (answers.gauche && answers.droit ? "both" : (answers.gauche || answers.droit ? "one" : "none"));


        var titre = TestVue.currentLabel[TestVue.currentQuestion][(typeof(main) == "undefined" ? "FR" : main.language)][labelAnswer].titre;
        var texte = TestVue.currentLabel[TestVue.currentQuestion][(typeof(main) == "undefined" ? "FR" : main.language)][labelAnswer].texte;

        var img = (typeof(main) == "undefined" ? "" : main.theme_directory + "/") + "img/testvue-resultat-good.jpg";
        if (labelAnswer == "one")
            img = (typeof(main) == "undefined" ? "" : main.theme_directory + "/") + "img/testvue-resultat-middle.jpg";
        else if (labelAnswer == "none")
            img = (typeof(main) == "undefined" ? "" : main.theme_directory + "/") + "img/testvue-resultat-bad.jpg";

        currentLI.find(".testVue-resultat__img").attr("src", img);
        currentLI.find(".testVue-resultat__subtitle").html(titre);
        currentLI.find(".testVue-resultat__txt").html(texte);

        TestVue.currentResult[TestVue.currentQuestion + "_statut"] = "done";

        if (isFinal) {
            $('.testVue .navFourth__item[data-onglet="tab' + TestVue.currentQuestion.replace("question", "") + '"]').find('.testVue-nav__iconOngletValid').addClass('testVue-nav__iconOngletValid__active');
        }

        $.cookie("infosTestVue", JSON.stringify(TestVue.currentResult));

        var cloneResult = currentLI.children().clone();
        cloneResult.addClass("testVue-cookie").find("button").remove();
        if (currentLI.siblings().first().find(".testVue-cookie").length > 0)
            currentLI.siblings().first().find(".testVue-cookie").remove();
        currentLI.siblings().first().addClass("testVue__page--withResult");
        currentLI.siblings().first().prepend(cloneResult);
    },
}

var TestKeyboard = function(bloc, step) {
    var elem = this;
    elem.nbSteps = 0;
    elem.lastRotation = 0;
    elem.currentQuestion = 0;
    elem.currentErreur = 0;
    elem.currentBloc = null;
    elem.currentPlay = null;

    elem.init = function(bloc, step) {
        elem.currentBloc = bloc;
        elem.nbSteps = step;
        elem.currentPlay = bloc.find(".iconPlay");
        elem.currentBloc.find(".withQuestion").find(".buttonNextPage").addClass("disable");
        elem.currentBloc.on("click", ".buttonNextPage.disable", function() {
            elem.answerQuestion($(this), $(this).find(".btnAnswer").attr("data-value"));
        });
        elem.refresh();
    }

    elem.refresh = function() {
            elem.currentQuestion = 0;
            elem.currentErreur = 0;
            elem.setNewQuestion();
        },

        elem.setNewQuestion = function() {
            var newRotation = Math.floor(Math.random() * 4);
            while (newRotation == elem.lastRotation)
                newRotation = Math.floor(Math.random() * 4);
            elem.lastRotation = newRotation;

            var thisRotation = elem.lastRotation * 90;

            var newClass = (elem.currentQuestion == 0 ? "" : "iconX" + (elem.currentQuestion + 1));

            for (var i = 2; i < 20; i++)
                elem.currentPlay.removeClass("iconX" + i);

            elem.currentPlay.addClass(newClass).css("transform", "rotate(" + thisRotation + "deg)");
            elem.currentBloc.find(".withQuestion .buttonNextPage").each(function(index) {
                if ((index + 4) % 4 == elem.lastRotation)
                    $(this).find(".btnAnswer").attr("data-value", "ok");
                else
                    $(this).find(".btnAnswer").attr("data-value", "ko");
            });
        },

        elem.answerQuestion = function(button, type) {
            if (type == "ko") {
                elem.currentErreur++;
                if (elem.currentErreur < 3)
                    elem.setNewQuestion();
                else
                    elem.goEnd(button);
            } else {
                elem.currentQuestion++;
                elem.currentErreur = 0;
                if (elem.currentQuestion < elem.nbSteps)
                    elem.setNewQuestion();
                else
                    elem.goEnd(button);
            }
        },

        elem.goEnd = function(button) {
            button.removeClass("disable").click().addClass("disable");
            elem.refresh();
        }
    elem.init(bloc, step);
}

var Mappemonde = {
    init: function() {
        // first nav
        $('.mappemonde__nav .navFourth__list li').click(function() {
            var buttonId = $(this).attr('id');
            $('.mappemonde__content').fadeOut('fast', function() {
                $(this).find('.mappemonde__content__carte').removeClass('mappemonde__content__carte--active');
                $('.mappemonde__content__carte#' + buttonId).addClass('mappemonde__content__carte--active');
                $(this).fadeIn('fast');
            });


            $('.navFourth__link').each(function() {
                if ($(this).hasClass('navFourth__link--active')) {
                    $(this).removeClass('navFourth__link--active');
                    $('.navFourth__item#' + buttonId).find('.navFourth__link').addClass('navFourth__link--active');
                }
            });
        });
        //second Nav
        $('.mappemonde__infoBox__elements').click(function() {
            var activeId = $(this).attr('id');

            $('.mappemonde__content__carte--active .mappemonde__content__carte__list').fadeOut('fast', function() {
                $(this).find('.mappemonde__content__carte__img').removeClass('mappemonde__content__carte__img--active');
                $('.mappemonde__content__carte__img#' + activeId).addClass('mappemonde__content__carte__img--active');
                $(this).fadeIn('fast');
            });

            $('.mappemonde__infoBox__elements').each(function() {
                if ($(this).hasClass('mappemonde__infoBox__elements--active')) {
                    $(this).removeClass('mappemonde__infoBox__elements--active');
                    $('.mappemonde__infoBox__elements#' + activeId).addClass('mappemonde__infoBox__elements--active');
                }
            });
        });

    }
}

var StepPopin = {
    init: function() {
        /*        if (location.hash == "#inscription") {
                    $("body").append('<div class="popIn" id="PopInscription"><div><header><a href="#" title="Fermer la fen&ecirc;tre" class="popinNewsletterclose"><span class="icon icon-essilor_close" style="color:#f66154"></span></a></header><section><div class="txtC"><h2 class="header2__title title1"><span>Newsletter</span><br />Essilor</h2></div><div class="txtPop"><h3>Confirmation d&rsquo;inscription</h3><p>Votre inscription a bien &eacute;t&eacute; enregistr&eacute;e.</p></div><div class="txtC"><a class="btn1 form__btnSubmit btnSlidingBg btn1--fullMore1 popinNewsletterclose" href="#"><span class="btn1__txt">Poursuivre votre visite</span></a></div></section></div></div>');
                    $("#PopInscription").fadeIn(500);
                }
        
                else if (location.hash == "#confirmation") {
                    $("body").append('<div class="popIn" id="PopConfirmation"><div><header><a href="#" title="Fermer la fen&ecirc;tre" class="popinNewsletterclose"><span class="icon icon-essilor_close" style="color:#f66154"></span></a></header><section><div class="txtC"><h2 class="header2__title title1"><span>Newsletter</span><br />Essilor</h2></div><div class="txtPop"><h3>D&eacute;sinscription</h3><p>Votre demande de d&eacute;sinscription a bien &eacute;t&eacute; enregistr&eacute;e.</p></div><div class="txtC"><a class="btn1 form__btnSubmit btnSlidingBg btn1--fullMore1 popinNewsletterclose" href="#"><span class="btn1__txt">Poursuivre votre visite</span></a></div></section></div></div>');
                    $("#PopConfirmation").fadeIn(500);
                }*/





    }
}

var LectureZen = {
    init: function() {
        // LectureZen.start();

        $('body').on('click', '.zen__layout li a', function() {
            $(this).parent().find('a').removeClass('zen__layout__active');
            $(this).addClass('zen__layout__active');
        });

    },
    read: function(txt) {
        responsiveVoice.speak(txt, "French Female");
    },
    start: function() {
        var zenTitre = $(".zenTitre");
        if (zenTitre.length > 0) {
            var pageZen = $('<div class="zenOverlay"></div><div class="zen"><div class="zen__header"><div class="zen__layout"><span class="zen__infos" href="#"><span>i</span></span><p class="zen__logo"><span class="icon icon-essilor_fontsize"></span></p><p class="zen__close"><a class="jsZenReaderQuit" href="#">Quitter la lecture zen</a></p></div></div><div class="zen__tools"><div class="zen__layout"><ul><li class="zen__layout__choixFond"><a href="javascript:void(0)" class="setDay zen__layout__active"><span class="icon icon-essilor_sunlight"></span></a><a href="javascript:void(0)" class="setNight"><span class="icon icon-essilor_moonlight"></span></a></li><li class="zen__layout__choixTypo"><a href="javascript:void(0)" class="setGotham zen__layout__active"><span class="choixTypoLetters">Aa</span><span class="choixTypoFonts">Gotham</span></a><a href="javascript:void(0)" class="setGeorgia"><span class="choixTypoLetters">Aa</span><span class="choixTypoFonts">Georgia</span></a></li><li class="zen__layout__choixSizeTypo"><span class="zen__layout__choixSizeTypo__less">-Aa</span><input type="range" id="rangeFontSize" min="7" max="24" /><span class="zen__layout__choixSizeTypo__more">+Aa</span></li><li class="zen__layout__choixLineheight"><span class="icon icon-essilor_lineheight-less"></span><input type="range" id="rangeLineHeight" min="0.7" max="2" step="0.01" /><span class="icon icon-essilor_lineheight-more"></span></li><li class="zen__layout__choixEspace"><div class="zen__layout__choixEspace__less"><span class="icon icon-essilor_arrow1-left"></span><span class="icon icon-essilor_arrow1-right"></span></div><input type="range" id="rangeLetterSpacing" min="-4" max="10" step="0.01" /><div class="zen__layout__choixEspace__more"><span class="icon icon-essilor_arrow1-left"></span>  <span class="icon icon-essilor_arrow1-right"></span></div></li><li class="zen__layout__choixSon"><a href="javascript:void(0)" class="setVolumeOn zen__layout__active hidden"><span class="icon icon-essilor_audio"></span></a><a href="javascript:void(0)" class="hidden setVolumeOff"><span class="icon icon-essilor_audio-off"></span></a><a href="javascript:void(0)" class="jsLectureZen__startRead--play"><span class="icon icon-essilor_audio-play"></span></a><a href="javascript:void(0)" class="jsLectureZen__startRead--pause"><span class="icon icon-essilor_audio-pause"></span></a><a href="javascript:void(0)" class="jsLectureZen__startRead--stop"><span class="icon icon-essilor_audio-stop"></span></a></li></ul></div></div><div class="zen__body"><div class="zen__content"></div><div class="responsiveVoice__link" ><a rel="license" href="//responsivevoice.org/"><img title="ResponsiveVoice Text To Speech" src="//responsivevoice.org/wp-content/uploads/2014/08/120x31.png" style="float:left;padding-right:2px"></a><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title"><a href="//responsivevoice.org/" target="_blank" title="ResponsiveVoice Text To Speech">ResponsiveVoice</a></span> used under <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/" title="Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License">Non-Commercial License</a></div></div></div>');
            var zenContent = pageZen.find(".zen__content");

            //Fil Ariane
            var ariane = $(".breadcrumb");
            if (ariane.length > 0)
                zenContent.append("<div class='zen__ariane'>" + UI.getHTML(ariane.eq(0)) + "</div>");

            //Titre
            zenContent.append("<p class='zen__titre'>" + zenTitre.eq(0).html() + "</p>");

            //Introduction
            var zenDescription = $(".zenDescription");
            if (zenDescription.length > 0)
                zenContent.append("<div class='zen__description'>" + zenDescription.eq(0).html() + "</div>");

            //Contenu General
            $(".zenWysiwygTitre, .zenWysiwyg, .zenArticle, .noMobile .zenTrombi, .zenLexiqueTitre, .zenLexiqueTexte").each(function() {
                var elem = $(this);
                if (elem.hasClass("zenWysiwygTitre")) {
                    zenContent.append("<div class='zen__wysiwyg_titre'>" + elem.eq(0).html() + "</div>");
                } else if (elem.hasClass("zenWysiwyg")) {
                    zenContent.append("<div class='zen__wysiwyg'>" + elem.eq(0).html() + "</div>");
                } else if (elem.hasClass("zenArticle")) {
                    zenContent.append("<div class='zen__article'></div>");

                    //Article Titre
                    var zenArticleTitre = elem.find(".zenArticleTitre");
                    if (zenArticleTitre.length > 0)
                        zenContent.find(".zen__article").last().append("<p class='zen__subtitre'>" + zenArticleTitre.eq(0).html() + "</p>");

                    //Article Texte
                    var zenArticleTexte = elem.find(".zenArticleTexte");
                    if (zenArticleTexte.length > 0)
                        zenContent.find(".zen__article").last().append("<div class='zen__texte'>" + zenArticleTexte.eq(0).html() + "</div>");

                    //Article Texte
                    var zenArticleAuteur = elem.find(".zenArticleAuteur");
                    if (zenArticleAuteur.length > 0)
                        zenContent.find(".zen__article").last().append("<div class='zen__auteur'>" + zenArticleAuteur.eq(0).html() + "</div>");

                    //Article Lien
                    var zenArticleLien = elem.find(".zenArticleLien");
                    if (zenArticleLien.length > 0)
                        zenContent.find(".zen__article").last().append("<p class='zen__lien'><a href='" + zenArticleLien.eq(0).attr("href") + "'>En savoir plus</a></p>");
                } else if (elem.hasClass("zenTrombi")) {
                    zenContent.append("<div class='zen__trombi'></div>");

                    //Trombi Titre
                    var zenTrombiTitre = elem.find(".zenTrombiTitre");
                    if (zenTrombiTitre.length > 0)
                        zenContent.find(".zen__trombi").last().append("<p class='zen__trombi__titre'>" + zenTrombiTitre.eq(0).html() + "</p>");

                    //Trombi Texte
                    var zenTrombiTexte = elem.find(".zenTrombiTexte");
                    if (zenTrombiTexte.length > 0)
                        zenContent.find(".zen__trombi").last().append("<div class='zen__trombi__texte'>" + zenTrombiTexte.eq(0).html() + "</div>");
                } else if (elem.hasClass("zenLexiqueTitre")) {
                    zenContent.append("<div class='zen__lexique__titre'>" + elem.eq(0).html() + "</div>");
                } else if (elem.hasClass("zenLexiqueTexte")) {
                    zenContent.append("<div class='zen__lexique__texte'><p>" + $.trim(elem.eq(0).text()) + "</p></div>");
                }
            });


            //Lire aussi
            var zenLireAussi = $(".zenLireAussi");
            if (zenLireAussi.length > 0) {
                zenContent.append("<div class='zen__lireaussi'><p class='zen__subtitre'>" + zenLireAussi.eq(0).html() + "</p></div>");

                $(".noMobile .zenLireAussi__article").each(function() {
                    zenContent.find(".zen__lireaussi").append("<p class='zen__lien'><a href='" + $(this).attr("href") + "'>" + $(this).html() + "</a></p>");
                });
            }

            $("body").append(pageZen);

            $(".zen__titre, .zen__description, .zen__description p, .zen__article, .zen__subtitre, .zen__texte, .zenArticle__lien, .zen__lireaussi").removeAttr("style");

            LectureZen.setEvent();

            $('input[type=range]').rangeslider({
                polyfill: false
            });

            if (typeof(main) != "undefined" && main.language === 'EN') {
                $('.zen__close').find('a').text('Exit zen reading');
            }
        } else
            console.log("no Zen");


        $('.jsLectureZen__startRead--play').on("click", function() {
            var txt = $('.zen__body')[0].innerText;
            /*if(responsiveVoice.isPlaying()){
                responsiveVoice.resume();
            }else{*/
            LectureZen.read(txt);
            /*}*/
        });
        $('.jsLectureZen__startRead--pause').on("click", function() {
            responsiveVoice.pause();
        });
        $('.jsLectureZen__startRead--stop').on("click", function() {
            responsiveVoice.cancel();
        });

    },
    quit: function() {
        $(".zen, .zenOverlay").remove();
    },
    setEvent: function() {
        var baseFontSize = parseInt($(".zen__content").css("font-size"));
        var baseLineHeight = parseInt($(".zen__content").css("line-height")) / 10;
        var baseLetterSpacing = parseInt($(".zen__content").css("letter-spacing"));

        $("#rangeFontSize").val(baseFontSize);
        $("#rangeLineHeight").val(baseLineHeight);
        $("#rangeLetterSpacing").val(baseLetterSpacing);

        $("#rangeFontSize").on("input", function() {
            $(".zen__content").css("font-size", $(this).val() + "px");
        });
        $("#rangeLineHeight").on("input", function() {
            $(".zen__content").css("line-height", $(this).val());
        });
        $("#rangeLetterSpacing").on("input", function() {
            $(".zen__content").css("letter-spacing", $(this).val() + "px");
        });
        $(".setDay").on("click", function() {
            $(".zen__body").removeClass("modeNight");
        });
        $(".setNight").on("click", function() {
            $(".zen__body").addClass("modeNight");
        });

        $(".setGotham").on("click", function() {
            $(".zen__content").removeClass("modeGeorgia");
        });
        $(".setGeorgia").on("click", function() {
            $(".zen__content").addClass("modeGeorgia");
        });
    }
};

var GoogleSearchCustom = {
    init: function() {
        var customSearchField = $("#cse-search-form");
        if (customSearchField.length > 0) {
            customSearchField.find("input.gsc-search-button").attr("src", "");
        }
    }
}

var CustomScrollBar = {
    init: function() {
        CustomScrollBar.scrollBarApis = {};
        var blocsWithScrollBar = $(".jsCustomScrollBar");

        if (!Device.isMobile && blocsWithScrollBar.length > 0) {
            blocsWithScrollBar.each(function() {
                // console.log(customScrollKey + ": " + $(this).data("custom-scroll"), customScrollValue + ": " + $(this).jScrollPane({animateScroll: true}).data().jsp);
                CustomScrollBar.scrollBarApis[$(this).data("custom-scroll")] = $(this).jScrollPane({
                    animateScroll: true
                }).data().jsp;
            });
        }
    },
    buildScroll: function(elem) {
        if (!elem.children(".jspContainer").length > 0) {
            CustomScrollBar.scrollBarApis[elem.data("custom-scroll")] = elem.jScrollPane({
                animateScroll: true
            }).data().jsp;
        }
    },
    destroyScroll: function(elem) {
        if (elem.children(".jspContainer").length > 0) {
            CustomScrollBar.scrollBarApis[elem.data("custom-scroll")].destroy();
            delete CustomScrollBar.scrollBarApis[elem.data("custom-scroll")];
        }
    }
}

var BrandsCards = {
    init: function() {
        var cards = $(".cardBox4");

        if (cards.length > 0) {
            $(".cardBox4").each(function() {
                var strBorderColor = $(this).css("border-color");
                var colors = strBorderColor.substring(strBorderColor.lastIndexOf("(") + 1, strBorderColor.lastIndexOf(")"));
                $(this).css({
                    'border': '1px solid rgba(' + colors + ', .2)'
                });

                $(this).on("mouseenter", function() {
                    $(this).css({
                        'border': '1px solid rgba(' + colors + ', 1)'
                    });
                });
                $(this).on("mouseleave", function() {
                    $(this).css({
                        'border': '1px solid rgba(' + colors + ', .2)'
                    });
                });
            });
        }
    }
}

var Magazine = {
    init: function() {
        Magazine.dataMediaBox2Titles = $(".dataMediaBox2__title");
        Magazine.panels = $(".jsMagSectionPanel");
        Magazine.sectionTabs = $(".jsMagSectionTabs");
        Magazine.navMainMobile = $(".jsMagNavMobile");

        if (Magazine.dataMediaBox2Titles.length > 0 && !Device.isMobile) {
            Magazine.dataMediaBox2Relayout(Magazine.dataMediaBox2Titles, true);
        }

        Magazine.sectionTabs.find("a").on("click", function(e) {
            e.preventDefault();
            if (Device.isMobile)
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - ($('.headerMain__inner').height())
                }, 600);
            else if (Device.isTablette)
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - ($('.headerMain__inner').height() + 70)
                }, 600);
            else
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - ($('.navPrimary__list').height() + 100)
                }, 600);
        });

        Magazine.navMainMobile.find("a").on("click", function(e) {
            e.preventDefault();
            // console.log("Magazine tabIndex: " + $(this).parent().index());
            Magazine.navMainMobile.find("a").removeClass("btn4--active");
            $(this).addClass("btn4--active");
            $(".jsMagSectionPanel").removeClass("jsMagSectionPanel--active");
            $(".jsMagSectionPanel").eq($(this).parent().index()).addClass("jsMagSectionPanel--active");
            $('html, body').animate({
                scrollTop: $('.headerMain__inner').height() + $(".articleBox2__header").height() - Magazine.navMainMobile.height() + 17
            }, 400);

            // Trigger AnimeVerre if it's in the current panel (panel need to be displayed)
            if (!$('.animVerre').length > 0) {
                return;
            } else if ($('.animeVerre').closest($(".jsMagSectionPanel").index() === $(this).index())) {
                AnimVerre.init();
                $(window).resize();
            }
        });

        if (Device.isMobile) {
            if (Magazine.navMainMobile.length > 0) {
                $(window).on("scroll", Magazine.setMobileNav);
                Magazine.setMobileNav();
            }
        } else {
            $(".articleBox2__imgBox").sticky({
                className: "articleBox2__imgBoxWrapperSticky"
            });
        }

        $(window).on("resize", Magazine.resize);
    },
    dataMediaBox2Relayout: function(target, bHasOffset) {
        target.each(function() {
            var myTitle = $(this);
            var mediaOffset = (bHasOffset === true ? myTitle.outerHeight() : 0);
            myTitle.closest(".dataMediaBox2").find(".dataMediaBox2__media").css({
                "padding-top": mediaOffset
            });
        });
    },
    setMobileNav: function() {
        var magBody = $(".articleBox2__body");
        // console.log($('.headerMain__inner').height() + $(".articleBox2__header").height() - Magazine.navMainMobile.height());
        if ($(window).scrollTop() > $('.headerMain__inner').height() + $(".articleBox2__headerInner").height() - Magazine.navMainMobile.height() + 16) {
            Magazine.navMainMobile.addClass('articleBox2__tabsMobile--fixed').css({
                "top": $('.headerMain__inner').height()
            });
            magBody.css({
                "padding-top": "11.7rem"
            });
        } else {
            Magazine.navMainMobile.removeClass('articleBox2__tabsMobile--fixed').css({
                "top": "auto"
            });
            magBody.css({
                "padding-top": ""
            });
        }
    },
    resize: function() {
        if (Magazine.dataMediaBox2Titles.length > 0) {
            if (!Device.isMobile) {
                Magazine.dataMediaBox2Relayout(Magazine.dataMediaBox2Titles, true);
            } else {
                Magazine.dataMediaBox2Relayout(Magazine.dataMediaBox2Titles, false);
            }
        }

        if (Device.isMobile) {
            $(window).on("scroll", Magazine.setMobileNav);
            Magazine.setMobileNav();
            $(".articleBox2__imgBox").unstick();
        } else {
            $(window).off("scroll", Magazine.setMobileNav);
            if (!$(".articleBox2__imgBox").hasClass("articleBox2__imgBoxWrapperSticky")) {
                $(".articleBox2__imgBox").sticky({
                    className: "articleBox2__imgBoxWrapperSticky"
                });
            }

        }
    }

}


var FileUploadCustom = {
    init: function() {

        $('.form__fileUpload--input').click(function() {
            $(this).change(function() {
                var value = $(this).val().split('/').pop().split('\\').pop();
                $(this).parents('.form__fieldBox').find('.form__fileUploadText').html('> ' + value);
            });
        });




    }

}

var PeopleCards = {
    init: function() {
        var cardsListNoMobile = $(".noMobile .cardBoxList1");

        if (cardsListNoMobile.length > 0) {
            PeopleCards.items = cardsListNoMobile.children();
            PeopleCards.items.setAllToMaxHeight();
            $(window).on("resize", PeopleCards.resize);
        }
    },
    resize: function() {
        PeopleCards.items.css({
            "height": "auto"
        }).setAllToMaxHeight();
    }
}

var ScreenReader = {
    isVoiceStarted: false,
    isVoicePaused: false,
    init: function() {
        $("body").on("click", ".jsScreenReaderPlay", function() {
            ScreenReader.togglePlay($(".mainContent").find(".zenTitre, .zenDescription, .zenWysiwyg, .zenWysiwygTitre, .zenArticleTitre, .zenArticleTexte").text());
        });
    },
    read: function(txt) {
        responsiveVoice.speak(txt, "French Female", {
            onstart: ScreenReader.onVoiceStart,
            onend: ScreenReader.onVoiceEnd,
            onpause: ScreenReader.onVoicePause
        });
    },
    togglePlay: function(txt) {
        if (responsiveVoice.isPlaying()) {
            responsiveVoice.cancel();
        } else {
            ScreenReader.read(txt);
        }
    },
    onVoiceStart: function() {
        console.log("onVoiceStart Fired !");
        ScreenReader.isVoiceStarted = true;
    },
    onVoiceEnd: function() {
        console.log("onVoiceEnd Fired !");
        ScreenReader.isVoiceStarted = false;
    },
    onVoicePause: function() {
        console.log("onVoicePause Fired !");
        ScreenReader.isVoicePaused = true;
    }
}

var Tracking = {
    init: function() {
        $(".withTracking").each(function() {
            var category = $(this).data("ga-category");
            var action = $(this).data("ga-action");
            var label = $(this).data("ga-label");
            Tracking.add(category, action, label);
        });
        // Special links (WP Menus etc...)
        Tracking.addSpecial($('#menu-menu-header .navPrimary__link'), "Homepage", "Clic", "Nav_principal_");
        Tracking.addSpecial($('.navPrimaryMobile .navPrimaryMobile__link').not('.navPrimaryMobile__link--type2'), "Homepage", "Clic", "Nav_principal_");
        Tracking.addSpecial($('.navPrimaryMobile .navPrimaryMobile__link--type2'), "Homepage", "Clic", "Nav_lateral_");
        Tracking.addSpecial($('#menu-menu-footer .navTertiary__link'), "Footer", "Clic", "Footer_");
        Tracking.addSpecial($(".timeline__Index").find("p"), "Timeline", "Clic", "Timeline_clic_");

        // Home Slider
        $(".slider--typenoFred").on("click", ".slider__pager a", function(e) {
            Tracking.add("Homepage", "Clic", "Slideshow_" + $(e.target).text());
        });
        // Search Button
        $("body").on("click", 'input.gsc-search-button', function(e) {
            Tracking.add("Search", "Clic", "Search_requete");
        });
        // Other Sites - Brand country
        $(".jsSelectBrandCountry").on("change", function(e) {
            var sCountry = $(this).find("option:selected").text();
            var sBrand = $(this).closest(".cardBox4").find(".cardBox4__title").text();
            Tracking.add("Autres-Sites", "Clic", "Autres-Sites_" + sBrand + "_" + sCountry);
        });
        // News/PressRelease Filter
        $(".jsSelectTypeNews").on("change", function(e) {
            var sType = $(this).find("option:selected").text();
            var sPageName = $(this).closest(".filterBox").data("page-name");
            Tracking.add("Filtre medias", "Clic", "Medias_" + sPageName + "_" + sType);
        });
        // Informations réglementées
        $(".informationsReglementees__btn").on("click", function() {
            var sYear = $("#selector_infos_reglementees option:selected").text();
            var sPageName = $(this).data("page-name");
            Tracking.add("Téléchargement zip", "Clic", "Zip_" + sPageName + "_" + sYear);
        });

    },
    add: function(category, action, label) {
        if (typeof(ga) == "undefined") {
            // console.log("Google Analytics Absent : " + category + " - " + action + " - " + label);
        } else {
            ga('send', 'event', category, action, label);
        }
    },
    addSpecial: function(elems, category, action, labelPrefix) {
        // Special links (WP Menus etc...)
        elems.on("click", function(e) {
            var label = labelPrefix + Tracking.slugify($(this).text());
            Tracking.add(category, action, label);
            /*console.log("GA Tracking Special insert : " + category + " - " + action + " - " + label);
            alert("GA Tracking Special insert : " + category + " - " + action + " - " + label);*/
        });
    },
    slugify: function(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }
}

// Elements uniform max height calculation (Paul Irish)
$.fn.setAllToMaxHeight = function() {
    return this.height(Math.max.apply(this, $.map(this, function(e) {
        return $(e).height()
    })));
}

var CookieManager = {
    init: function() {
        if ($.cookie("bandeauCookie") != "1") {
            $("#bandeauCookie").show();
        }

        $("#bandeauCookie").find(".alert__picto").on("click", function() {
            $.cookie("bandeauCookie", "1");
        })
    }
}


var QuizMag = {
    init: function() {
        var quizRoot = $('.quizBox');
        if (!quizRoot.length > 0) {
            return;
        }

        var quizItems = QuizMag.quizItems = $('.quizBox__item');

        quizItems.find('.jsQuizBtnAnswer').on('click', function(e) {
            e.preventDefault();
            var myQuizItem = $(this).closest('.quizBox__item');
            myQuizItem.find('.quizBox__itemQuestion').hide();
            myQuizItem.find('.quizBox__itemAnswer').show();
        });

        quizItems.find('.jsQuizBtnNext').on('click', function(e) {
            e.preventDefault();
            var myQuizItem = $(this).closest('.quizBox__item');

            if (myQuizItem.index() < quizItems.length - 1) {
                myQuizItem.removeClass('quizBox__item--current');
                myQuizItem.next().addClass('quizBox__item--current');
            } else {
                QuizMag.resetQuiz();
            }
        });

    },
    resetQuiz: function() {
        QuizMag.quizItems.find('.quizBox__itemAnswer').hide();
        QuizMag.quizItems.find('.quizBox__itemQuestion').show();
        QuizMag.quizItems.removeClass('quizBox__item--current');
        QuizMag.quizItems.first().addClass('quizBox__item--current');
    }
}

function initJoinUsSlick() {

    console.log("OK")

    $("#joinus__quotescarousel").slick({
        // adaptiveHeight : true,
        arrows: true,
        dots: false,
        slidesToShow: 2,
        infinite: false,
        prevArrow: ".joinus__quotes .prev",
        nextArrow: ".joinus__quotes .next",
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            }
        }]
    });

    $("[data-quote]").on("click", (e) => {
        const index = $(e.currentTarget).data("quote");
        $("[data-quote-modal=" + index + "]").toggleClass("hidden");
    })

    $("[data-quote-modal] .joinusquotemodal__close").on("click", (e) => {
        $(e.currentTarget).parents("[data-quote-modal]").toggleClass("hidden")
    })

    $("[data-quote-modal]").on("click", (e) => {
        $(e.currentTarget).toggleClass("hidden");
    })

    $("[data-quote-modal] .joinusquotemodal__window").on("click", (e) => {
        e.stopPropagation();
    })

}

async function during(ms) {
    return (new Promise((res) => setTimeout(res, ms)));
}