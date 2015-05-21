define(function(require, exports, module) {

    /**
     * 选项卡组件
     *
     * @module Gallery
     */
    'use strict';


    var $ = require('$'),
        Widget = require('widget'),
        Swiper = require('./swiper'),
        importStyle = require('./gallery.css'),
        template = require('./gallery.handlebars');

    importStyle();

    /**
     * 选项卡
     * @class Tabs
     * @extends Widget
     * @constructs
     */

    var Tabs = Widget.extend({

        defaults: {
            tab: '',
            contentWrap: '',
        },

        setup: function() {
            var self = this;

            var tabsSwiper = new Swiper(self.option('contentWrap'), {
                speed: 500,
                onSlideChangeStart: function() {
                    $(self.option('tab') + ' .active').removeClass('active');
                    $(self.option('tab') + ' a').eq(tabsSwiper.activeIndex).addClass('active');
                }
            });

            $(self.option('tab') + ' a').on('click', function(e) {
                e.preventDefault();
                $(self.option('tab') + ' .active').removeClass('active');
                $(this).addClass('active');
                tabsSwiper.slideTo($(this).index());
            });
        }

    });

    module.exports = Tabs;


});