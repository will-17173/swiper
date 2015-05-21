define(function(require, exports, module) {

    /**
     * 页内组图
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
     * 页内组图
     * @class Gallery
     * @extends Widget
     * @constructs
     */

    var Gallery = Widget.extend({

        defaults: {
            element: '', //从这个元素获取图片, 与data属性二选一
            exclude: '', //JQ表达式, 需要排除掉的图片, 从页面中抽取图片时才需要 
            data: {} //数据来源，与element二选一
        },

        setup: function() {
            this.getImages();
        },

        getImages: function() {
            var self = this,
                data = {};

            if (self.option('element') !== '') {
                var $img = $('.art-bd img').not(self.option('exclude'));
                data.list = [];
                data.length = $img.length;
                for (var i = 0; i < data.length; i++) {
                    var temp = {
                        src: $img.eq(i).attr('src'),
                        originalSrc: $img.eq(i).attr('src').split('!a')[0].replace(/(.*)([s]{1})(\.[a-z]*$)/i, '$1$3'),
                        index: i + 1
                    };
                    data.list.push(temp);
                }
                this.newGallery(data, $img);
            } else {
                data = self.option('data');
                this.newGallery(data);
            }

        },

        newGallery: function(data, $img) {
            var self = this,
                top = 0;
            $(template(data)).appendTo('body');
            var gallery = new Swiper('#page_gallery .swiper-container');

            if ($img) {
                $img.each(function(i, el) {
                    $(this).on('click', function() {
                        top = $(window).scrollTop();
                        $(window).scrollTop(0);
                        gallery.slideTo(i, 0);
                        $('#page_gallery').css({
                            left: 0,
                            top: 0
                        });
                        $('html, body').css({
                            overflow: 'hidden',
                            height: '100%'
                        });
                    });
                });
                $('.gallery-back').click(function() {
                    $('#page_gallery').css({
                        left: '-200%',
                        top: 0
                    });
                    $('html, body').removeAttr('style'); //TODO: 坑
                    $(window).scrollTop(top);
                });
            }

        }

    });

    module.exports = Gallery;


});