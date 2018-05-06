 import {ui} from '../../../rappid/build/rappid.min';

export const stencil = {
    groups: <{ [key: string]: ui.Stencil.Group }>{
        basic: { index: 1, label: 'Basic shapes' },
        fsa: { index: 2, label: 'State machine' },
        pn: { index: 3, label: 'Petri nets' },
        erd: { index: 4, label: 'Entity-relationship' },
        uml: { index: 5, label: 'UML' },
        org: { index: 6, label: 'ORG' }
    },
    shapes: {
        basic: [
            {
                type: 'basic.Rect',
                size: { width: 5, height: 3 },
                attrs: {
                    '.': {
                        'data-tooltip': 'Rectangle',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    rect: {
                        rx: 2,
                        ry: 2,
                        width: 50,
                        height: 30,
                        fill: 'transparent',
                        stroke: '#31d0c6',
                        'stroke-width': 2,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'rect',
                        fill: '#c6c7e2',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11,
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'basic.Circle',
                size: { width: 5, height: 3 },
                attrs: {
                    '.': {
                        'data-tooltip': 'Ellipse',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    circle: {
                        width: 50,
                        height: 30,
                        fill: 'transparent',
                        stroke: '#31d0c6',
                        'stroke-width': 2,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'ellipse',
                        fill: '#c6c7e2',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11,
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'app.RectangularModel',
                size: { width: 40, height: 30 },
                inPorts: ['in1', 'in2'],
                outPorts: ['out'],
                allowOrthogonalResize: false,
                attrs: {
                    '.': {
                        'data-tooltip': 'Rectangle with ports',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.body': {
                        fill: 'transparent',
                        rx: 2,
                        ry: 2,
                        stroke: '#31d0c6',
                        'stroke-width': 2,
                        'stroke-dasharray': '0'
                    },
                    '.label': {
                        text: 'rect',
                        fill: '#c6c7e2',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11,
                        'stroke-width': 0,
                        'ref-y': 0.5,
                        'y-alignment': 'middle'
                    }
                }
            },
            {
                type: 'app.CircularModel',
                size: { width: 5, height: 3 },
                inPorts: ['in1', 'in2'],
                outPorts: ['out'],
                allowOrthogonalResize: false,
                attrs: {
                    '.': {
                        'data-tooltip': 'Ellipse with ports',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.body': {
                        fill: 'transparent',
                        stroke: '#31d0c6',
                        'stroke-width': 2,
                        'stroke-dasharray': '0',
                        'rx': '50%',
                        'ry': '50%'
                    },
                    '.label': {
                        text: 'ellipse',
                        fill: '#c6c7e2',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11,
                        'stroke-width': 0,
                        'ref-y': 0.5,
                        'y-alignment': 'middle'
                    }
                }
            },
            {
                type: 'basic.Image',
                size: { width: 53, height: 42 },
                attrs: {
                    '.': {
                        'data-tooltip': 'Image',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    image: {
                        width: 53,
                        height: 42,
                        'xlink:href': './assets/image-icon1.svg'
                    },
                    text: {
                        text: 'image',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 9,
                        display: '',
                        stroke: '#000',
                        'stroke-width': 0,
                        'fill': '#222138'
                    }
                }
            }
        ],
        fsa: [

            {
                type: 'fsa.StartState',
                preserveAspectRatio: true,
                attrs: {
                    '.': {
                        'data-tooltip': 'Start State',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    circle: {
                        width: 50,
                        height: 30,
                        fill: '#61549C',
                        'stroke-width': 0
                    },
                    text: {
                        text: 'startState',
                        fill: '#c6c7e2',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11,
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'fsa.EndState',
                preserveAspectRatio: true,
                attrs: {
                    '.': {
                        'data-tooltip': 'End State',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.inner': {
                        fill: '#6a6c8a',
                        stroke: 'transparent'
                    },
                    '.outer': {
                        fill: 'transparent',
                        stroke: '#61549C',
                        'stroke-width': 2,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'endState',
                        fill: '#c6c7e2',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11,
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'fsa.State',
                preserveAspectRatio: true,
                attrs: {
                    '.': {
                        'data-tooltip': 'State',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    circle: {
                        fill: '#6a6c8a',
                        stroke: '#61549C',
                        'stroke-width': 2,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'state',
                        fill: '#c6c7e2',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11,
                        'stroke-width': 0
                    }
                }
            }
        ],
        pn: [

            {
                type: 'pn.Place',
                preserveAspectRatio: true,
                tokens: 3,
                attrs: {
                    '.': {
                        'data-tooltip': 'Place',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.root': {
                        fill: 'transparent',
                        stroke: '#61549C',
                        'stroke-width': 2,
                        'stroke-dasharray': '0'
                    },
                    '.tokens circle': {
                        fill: '#6a6c8a',
                        stroke: '#000',
                        'stroke-width': 0
                    },
                    '.label': {
                        text: '',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal'
                    }
                }
            },
            {
                type: 'pn.Transition',
                preserveAspectRatio: true,
                attrs: {
                    '.': {
                        'data-tooltip': 'Transition',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    rect: {
                        rx: 3,
                        ry: 3,
                        width: 12,
                        height: 50,
                        fill: '#61549C',
                        stroke: '#7c68fc',
                        'stroke-width': 0,
                        'stroke-dasharray': '0'
                    },
                    '.label': {
                        text: 'transition',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'stroke-width': 0,
                        'fill': '#222138'
                    }
                }
            }
        ],
        erd: [

            {
                type: 'erd.Entity',
                attrs: {
                    '.': {
                        'data-tooltip': 'Entity',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        rx: 3,
                        ry: 3,
                        fill: '#31d0c6',
                        'stroke-width': 2,
                        stroke: 'transparent',
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'Entity',
                        'font-size': 11,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        fill: '#f6f6f6',
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'erd.WeakEntity',
                attrs: {
                    '.': {
                        'data-tooltip': 'Weak Entity',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        fill: 'transparent',
                        stroke: '#feb663',
                        'stroke-width': 2,
                        points: '100,0 100,60 0,60 0,0',
                        'stroke-dasharray': '0'
                    },
                    '.inner': {
                        fill: '#feb663',
                        stroke: 'transparent',
                        points: '97,5 97,55 3,55 3,5',
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'Weak entity',
                        'font-size': 11,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        fill: '#f6f6f6',
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'erd.Relationship',
                attrs: {
                    '.': {
                        'data-tooltip': 'Relationship',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        fill: '#61549C',
                        stroke: 'transparent',
                        'stroke-width': 2,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'Relation',
                        'font-size': 11,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        fill: '#f6f6f6',
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'erd.IdentifyingRelationship',
                attrs: {
                    '.': {
                        'data-tooltip': 'Identifying Relationship',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        fill: 'transparent',
                        stroke: '#6a6c8a',
                        'stroke-dasharray': '0'
                    },
                    '.inner': {
                        fill: '#6a6c8a',
                        stroke: 'transparent',
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'Relation',
                        'font-size': 11,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        fill: '#f6f6f6',
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'erd.ISA',
                attrs: {
                    '.': {
                        'data-tooltip': 'ISA',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    text: {
                        text: 'ISA',
                        fill: '#f6f6f6',
                        'letter-spacing': 0,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11
                    },
                    polygon: {
                        fill: '#feb663',
                        stroke: 'transparent',
                        'stroke-dasharray': '0'
                    }
                }
            },
            {
                type: 'erd.Key',
                attrs: {
                    '.': {
                        'data-tooltip': 'Key',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        fill: 'transparent',
                        stroke: '#fe854f',
                        'stroke-dasharray': '0'
                    },
                    '.inner': {
                        fill: '#fe854f',
                        stroke: 'transparent',
                        display: 'block',
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'Key',
                        'font-size': 11,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        fill: '#f6f6f6',
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'erd.Normal',
                attrs: {
                    '.': {
                        'data-tooltip': 'Normal',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        fill: '#feb663',
                        stroke: 'transparent',
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'Normal',
                        'font-size': 11,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        fill: '#f6f6f6',
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'erd.Multivalued',
                attrs: {
                    '.': {
                        'data-tooltip': 'Mutltivalued',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        fill: 'transparent',
                        stroke: '#fe854f',
                        'stroke-dasharray': '0'
                    },
                    '.inner': {
                        fill: '#fe854f',
                        stroke: 'transparent',
                        rx: 43,
                        ry: 21,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'MultiValued',
                        'font-size': 11,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        fill: '#f6f6f6',
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'erd.Derived',
                attrs: {
                    '.': {
                        'data-tooltip': 'Derived',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        fill: 'transparent',
                        stroke: '#fe854f',
                        'stroke-dasharray': '0'
                    },
                    '.inner': {
                        fill: '#feb663',
                        stroke: 'transparent',
                        'display': 'block',
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'Derived',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11,
                        'stroke-width': 0
                    }
                }
            }
        ],
        uml: [

            {
                type: 'uml.Class',
                name: 'Class',
                attributes: ['+attr1'],
                methods: ['-setAttr1()'],
                size: {
                    width: 150,
                    height: 100
                },
                attrs: {
                    '.': {
                        'data-tooltip': 'Class',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.uml-class-name-rect': {
                        top: 2,
                        fill: '#61549C',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8
                    },
                    '.uml-class-attrs-rect': {
                        top: 2,
                        fill: '#61549C',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8
                    },
                    '.uml-class-methods-rect': {
                        top: 2,
                        fill: '#61549C',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8
                    },
                    '.uml-class-name-text': {
                        ref: '.uml-class-name-rect',
                        'ref-y': 0.5,
                        'y-alignment': 'middle',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11
                    },
                    '.uml-class-attrs-text': {
                        ref: '.uml-class-attrs-rect',
                        'ref-y': 0.5,
                        'y-alignment': 'middle',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11
                    },
                    '.uml-class-methods-text': {
                        ref: '.uml-class-methods-rect',
                        'ref-y': 0.5,
                        'y-alignment': 'middle',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11
                    }
                }
            },
            {
                type: 'uml.Interface',
                name: 'Interface',
                attributes: ['+attr1'],
                methods: ['-setAttr1()'],
                size: {
                    width: 150,
                    height: 100
                },
                attrs: {
                    '.': {
                        'data-tooltip': 'Interface',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.uml-class-name-rect': {
                        fill: '#fe854f',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8
                    },
                    '.uml-class-attrs-rect': {
                        fill: '#fe854f',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8
                    },
                    '.uml-class-methods-rect': {
                        fill: '#fe854f',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8
                    },
                    '.uml-class-name-text': {
                        ref: '.uml-class-name-rect',
                        'ref-y': 0.5,
                        'y-alignment': 'middle',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11
                    },
                    '.uml-class-attrs-text': {
                        ref: '.uml-class-attrs-rect',
                        'ref-y': 0.5,
                        'y-alignment': 'middle',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-size': 11
                    },
                    '.uml-class-methods-text': {
                        ref: '.uml-class-methods-rect',
                        'ref-y': 0.5,
                        'y-alignment': 'middle',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11
                    }
                }
            },
            {
                type: 'uml.Abstract',
                name: 'Abstract',
                attributes: ['+attr1'],
                methods: ['-setAttr1()'],
                size: {
                    width: 150,
                    height: 100
                },
                attrs: {
                    '.': {
                        'data-tooltip': 'Abstract',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.uml-class-name-rect': {
                        fill: '#6a6c8a',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8
                    },
                    '.uml-class-attrs-rect': {
                        fill: '#6a6c8a',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8
                    },
                    '.uml-class-methods-rect': {
                        fill: '#6a6c8a',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8
                    },
                    '.uml-class-name-text': {
                        ref: '.uml-class-name-rect',
                        'ref-y': 0.5,
                        'y-alignment': 'middle',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11
                    },
                    '.uml-class-attrs-text': {
                        ref: '.uml-class-attrs-rect',
                        'ref-y': 0.5,
                        'y-alignment': 'middle',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11
                    },
                    '.uml-class-methods-text': {
                        ref: '.uml-class-methods-rect',
                        'ref-y': 0.5,
                        'y-alignment': 'middle',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 11
                    }
                }
            },

            {
                type: 'uml.State',
                name: 'State',
                events: ['entry/', 'create()'],
                size: {
                    width: 150,
                    height: 100
                },
                attrs: {
                    '.': {
                        'data-tooltip': 'State',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.uml-state-body': {
                        fill: '#feb663',
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        rx: 8,
                        ry: 8,
                        'stroke-dasharray': '0'
                    },
                    '.uml-state-separator': {
                        stroke: '#f6f6f6',
                        'stroke-width': 1,
                        'stroke-dasharray': '0'
                    },
                    '.uml-state-name': {
                        fill: '#f6f6f6',
                        'font-size': 11,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal'
                    },
                    '.uml-state-events': {
                        fill: '#f6f6f6',
                        'font-size': 11,
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal'
                    }
                }
            }
        ],
        org: [

            {
                type: 'org.Member',
                attrs: {
                    '.': {
                        'data-tooltip': 'Member',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.rank': {
                        text: 'Rank',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-size': 12,
                        'font-weight': 'Bold',
                        'text-decoration': 'none'
                    },
                    '.name': {
                        text: 'Person',
                        fill: '#f6f6f6',
                        'font-family': 'Roboto Condensed',
                        'font-weight': 'Normal',
                        'font-size': 10
                    },
                    '.card': {
                        fill: '#31d0c6',
                        stroke: 'transparent',
                        'stroke-width': 0,
                        'stroke-dasharray': '0'
                    },
                    image: {
                        width: 32,
                        height: 32,
                        x: 16,
                        y: 13,
                        'xlink:href': './assets/member-male.png'
                    }
                }
            }
        ]
    }
};


