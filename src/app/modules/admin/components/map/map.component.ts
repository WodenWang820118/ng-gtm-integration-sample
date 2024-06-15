import { Component, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';
import { geojson } from './geojson';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="chartdiv" style="height: 450px"></div>`,
  styles: [``],
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoMercator(),
      })
    );

    let zoomControl = chart.set(
      'zoomControl',
      am5map.ZoomControl.new(root, {
        x: am5.p0,
        centerX: am5.p0,
        y: am5.p0,
        centerY: am5.p0,
      })
    );

    zoomControl.homeButton.set('visible', true);

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        geoJSON: geojson,
      })
    );

    pointSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xff0000),
        }),
      });
    });
  }
}
