import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

declare var $: JQueryStatic;
import * as _ from 'lodash';
import * as config from '../app/config/configuration';
import * as joint from '../../rappid/build/rappid.min';
import '../app/models/joint.shapes.app';
joint.setTheme('material');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('ToolBarContainer') ToolBarContainer: ElementRef;
  @ViewChild('StencilContainer') StencilContainer: ElementRef;
  @ViewChild('PaperContainer') PaperContainer: ElementRef;
  @ViewChild('InspectorContainer') InspectorContainer: ElementRef;
  @ViewChild('NavigatorContainer') NavigatorContainer: ElementRef;
  graph: joint.dia.Graph;
  commandManager: joint.dia.CommandManager;
  paper: joint.dia.Paper;
  snaplines: joint.ui.Snaplines;
  paperScroller: joint.ui.PaperScroller;
  stencil: joint.ui.Stencil;
  keyboard: joint.ui.Keyboard;
  clipboard: joint.ui.Clipboard;
  selection: joint.ui.Selection;
  toolbar: joint.ui.Toolbar;
  navigator: joint.ui.Navigator;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.initializePaper();
    this.initializeStencil();
    this.initializeSelection();
    this.initializeHaloAndInspector();
    this.initializeNavigator();
    this.initializeToolbar();
    this.initializeKeyboardShortcuts();
    this.initializeTooltips();
}
initializePaper() {

  const graph = this.graph = new joint.dia.Graph;

  graph.on('add', (cell: joint.dia.Cell, collection: any, opt: any) => {
      if (opt.stencil) { this.createInspector(cell); }
  });

  this.commandManager = new joint.dia.CommandManager({ graph: graph });

  const paper = this.paper = new joint.dia.Paper({
      width: 1000,
      height: 1000,
      gridSize: 10,
      drawGrid: true,
      model: graph,
      defaultLink: new joint.shapes.app.Link()
  });

  paper.on('blank:mousewheel', _.partial(this.onMousewheel, null), this);
  paper.on('cell:mousewheel', this.onMousewheel.bind(this));

  this.snaplines = new joint.ui.Snaplines({ paper: paper });

  const paperScroller = this.paperScroller = new joint.ui.PaperScroller({
      paper,
      autoResizePaper: true,
      cursor: 'grab'
  });
  this.PaperContainer.nativeElement.appendChild(paperScroller.el);
  // $('.paper-container').append(paperScroller.el);

  paperScroller.render().center();
}

// Create and populate stencil.
initializeStencil() {

  const stencil = this.stencil = new joint.ui.Stencil({
      paper: this.paperScroller,
      snaplines: this.snaplines,
      scaleClones: true,
      width: 240,
      groups: config.stencil.groups,
      dropAnimation: true,
      groupsToggleButtons: true,
      search: {
          '*': ['type', 'attrs/text/text', 'attrs/.label/text'],
          'org.Member': ['attrs/.rank/text', 'attrs/.name/text']
      },
      // Use default Grid Layout
      layout: true,
      // Remove tooltip definition from clone
      dragStartClone: (cell: joint.dia.Cell) => cell.clone().removeAttr('./data-tooltip')
  });
  this.StencilContainer.nativeElement.appendChild(stencil.el);
  // $('.stencil-container').append(stencil.el);
  stencil.render().load(config.stencil.shapes);
}

initializeKeyboardShortcuts() {

  this.keyboard = new joint.ui.Keyboard();
  this.keyboard.on({

      'ctrl+c': () => {

          // Copy all selected elements and their associated links.
          this.clipboard.copyElements(this.selection.collection, this.graph);
      },

      'ctrl+v': () => {

          const pastedCells = this.clipboard.pasteCells(this.graph, {
              translate: { dx: 20, dy: 20 },
              useLocalStorage: true
          });

          const elements = _.filter(pastedCells, cell => cell.isElement());

          // Make sure pasted elements get selected immediately. This makes the UX better as
          // the user can immediately manipulate the pasted elements.
          this.selection.collection.reset(elements);
      },

      'ctrl+x shift+delete': () => {
          this.clipboard.cutElements(this.selection.collection, this.graph);
      },

      'delete backspace': (evt: JQuery.Event) => {
          evt.preventDefault();
          this.graph.removeCells(this.selection.collection.toArray());
      },

      'ctrl+z': () => {
          this.commandManager.undo();
          this.selection.cancelSelection();
      },

      'ctrl+y': () => {
          this.commandManager.redo();
          this.selection.cancelSelection();
      },

      'ctrl+a': () => {
          this.selection.collection.reset(this.graph.getElements());
      },

      'ctrl+plus': (evt: JQuery.Event) => {
          evt.preventDefault();
          this.paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
      },

      'ctrl+minus': (evt: JQuery.Event) => {
          evt.preventDefault();
          this.paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
      },

      'keydown:shift': (evt: JQuery.Event) => {
          this.paperScroller.setCursor('crosshair');
      },

      'keyup:shift': () => {
          this.paperScroller.setCursor('grab');
      }
  });
}

initializeSelection() {

  this.clipboard = new joint.ui.Clipboard();
  this.selection = new joint.ui.Selection({
      paper: this.paper,
      handles: config.selection.handles
  });

  // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
  // Otherwise, initiate paper pan.
  this.paper.on('blank:pointerdown', (evt: JQuery.Event, x: number, y: number) => {

      if (this.keyboard.isActive('shift', evt)) {
          this.selection.startSelecting(evt);
      } else {
          this.selection.cancelSelection();
          this.paperScroller.startPanning(evt);
      }

  });

  this.paper.on('element:pointerdown', (elementView: joint.dia.ElementView, evt: JQuery.Event) => {

      // Select an element if CTRL/Meta key is pressed while the element is clicked.
      if (this.keyboard.isActive('ctrl meta', evt)) {
          this.selection.collection.add(elementView.model);
      }

  });

  this.selection.on('selection-box:pointerdown', (elementView: joint.dia.ElementView, evt: JQuery.Event) => {

      // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
      if (this.keyboard.isActive('ctrl meta', evt)) {
          this.selection.collection.remove(elementView.model);
      }

  });
}

createInspector(cell: joint.dia.Cell) {

  return joint.ui.Inspector.create('.inspector-container', _.extend({ cell }, config.inspector[cell.get('type')]));
}

initializeHaloAndInspector() {

  this.paper.on('element:pointerup link:options', (cellView: joint.dia.CellView) => {

      const cell = cellView.model;

      if (!this.selection.collection.contains(cell)) {

          if (cell.isElement()) {

              new joint.ui.FreeTransform({
                  cellView,
                  allowRotation: false,
                  preserveAspectRatio: !!cell.get('preserveAspectRatio'),
                  allowOrthogonalResize: cell.get('allowOrthogonalResize') !== false
              }).render();

              new joint.ui.Halo({
                  cellView,
                  handles: config.halo.handles
              }).render();

              this.selection.collection.reset([]);
              this.selection.collection.add(cell, { silent: true });
          }

          this.createInspector(cell);
      }
  });
}

initializeNavigator() {

  const navigator = this.navigator = new joint.ui.Navigator({
      width: 240,
      height: 115,
      paperScroller: this.paperScroller,
      zoom: false
  });
  this.NavigatorContainer.nativeElement.appendChild(navigator.el);
  // $('.navigator-container').append(navigator.el);
  navigator.render();
}

initializeToolbar() {

  const toolbar = this.toolbar = new joint.ui.Toolbar({
      groups: config.toolbar.groups,
      tools: config.toolbar.tools,
      references: {
          paperScroller: this.paperScroller,
          commandManager: this.commandManager
      }
  });

  toolbar.on({
      'svg:pointerclick': () => this.openAsSVG(),
      'png:pointerclick': () => this.openAsPNG(),
      'to-front:pointerclick': () => this.selection.collection.invoke('toFront'),
      'to-back:pointerclick': () => this.selection.collection.invoke('toBack'),
      'layout:pointerclick': () => this.layoutDirectedGraph(),
      'snapline:change': (checked: boolean) => this.changeSnapLines(checked),
      'clear:pointerclick': () => this.graph.clear(),
      'print:pointerclick': () => this.paper.print(),
      'grid-size:change': (size: number) => this.paper.setGridSize(size)
  });
  this.ToolBarContainer.nativeElement.appendChild(toolbar.el);
  // $('.toolbar-container').append(toolbar.el);
  toolbar.render();
}

changeSnapLines(checked: boolean) {

  if (checked) {
      this.snaplines.startListening();
      this.stencil.options.snaplines = this.snaplines;
  } else {
      this.snaplines.stopListening();
      this.stencil.options.snaplines = null;
  }
}

initializeTooltips() {
  // tslint:disable-next-line:no-unused-expression
  new joint.ui.Tooltip({
      rootTarget: document.body,
      target: '[data-tooltip]',
      direction: joint.ui.Tooltip.TooltipArrowPosition.Auto,
      padding: 10
  });
}

openAsSVG() {

  this.paper.toSVG((svg: string) => {
      new joint.ui.Lightbox({
          title: '(Right-click, and use "Save As" to save the diagram in SVG format)',
          image: 'data:image/svg+xml,' + encodeURIComponent(svg)
      }).open();
  }, { preserveDimensions: true, convertImagesToDataUris: true });
}

openAsPNG() {

  this.paper.toPNG((dataURL: string) => {
      new joint.ui.Lightbox({
          title: '(Right-click, and use "Save As" to save the diagram in PNG format)',
          image: dataURL
      }).open();
  }, { padding: 10 });
}

onMousewheel(cellView: joint.dia.CellView, evt: JQuery.Event, ox: number, oy: number, delta: number) {

  if (this.keyboard.isActive('alt', evt)) {
      evt.preventDefault();
      this.paperScroller.zoom(delta * 0.2, { min: 0.2, max: 5, grid: 0.2, ox, oy });
  }
}

layoutDirectedGraph() {

  joint.layout.DirectedGraph.layout(this.graph, {
      setVertices: true,
      rankDir: 'TB',
      marginX: 100,
      marginY: 100
  });

  this.paperScroller.centerContent();
}
}
