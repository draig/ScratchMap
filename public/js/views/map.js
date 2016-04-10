define([
        'backbone.marionette'
    ],
    function(Marionette){
        'use strict';

        return Marionette.ItemView.extend({

            template: false,

            id: 'yandex-map',

            onRender: function(){
                this.$el.css({
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0
                });
            },

            initialize: function() {
                console.log("initialize a Map View");
                var scope = this;
                ymaps.ready(function () {
                    scope.map = new ymaps.Map(scope.el, {
                        center: [55.76, 37.64],
                        zoom: 7,
                        controls: []
                    });

                    // Создаем экземпляр класса ymaps.control.SearchControl
                    var mySearchControl = new ymaps.control.SearchControl({
                            options: {
                                noPlacemark: true
                            }
                        }),
                        // Результаты поиска будем помещать в коллекцию.
                        mySearchResults = new ymaps.GeoObjectCollection(null, {
                            hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]')
                        });
                    scope.map.controls.add(mySearchControl);
                    scope.map.geoObjects.add(mySearchResults);
                    // При клике по найденному объекту метка становится красной.
                    mySearchResults.events.add('click', function (e) {
                        e.get('target').options.set('preset', 'islands#redIcon');
                    });
                    // Выбранный результат помещаем в коллекцию.
                    mySearchControl.events.add('resultselect', function (e) {
                        var index = e.get('index');
                        mySearchControl.getResult(index).then(function (res) {
                            //res.balloon = addMarkBalloon;
                            res.options.set('hasHint', false);
                            res.options.set('balloonPanelMaxMapArea', Infinity);
                            mySearchResults.add(res);
                            res.balloon.oprion.set('contentLayout', ymaps.templateLayoutFactory.createClass('<h3>{{ properties.name }}</h3>', {}));
                            res.balloon.open();
                            //scope.map.setCenter(res);
                        });

                    }).add('submit', function () {
                        mySearchResults.removeAll();
                    });

                    /*placemark.events.add('balloonopen', function (e) {
                        placemark.properties.set('balloonContent', "Идет загрузка данных...");

                        // Имитация задержки при загрузке данных (для демонстрации примера).
                        setTimeout(function () {
                            ymaps.geocode(placemark.geometry.getCoordinates(), {
                                results: 1
                            }).then(function (res) {
                                var newContent = res.geoObjects.get(0) ?
                                    res.geoObjects.get(0).properties.get('name') :
                                    'Не удалось определить адрес.';

                                // Задаем новое содержимое балуна в соответствующее свойство метки.
                                placemark.properties.set('balloonContent', newContent);
                            });
                        }, 1500);
                    });*/
                });
            }
        });
    });