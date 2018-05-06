import {ui} from '../../../rappid/build/rappid.min';

export const selection = {

    handles: [{
        name: 'remove',
        position: ui.Selection.HandlePosition.NW,
        events: {
            pointerdown: 'removeElements'
        },
        attrs: {
            '.handle': {
                'data-tooltip-class-name': 'small',
                'data-tooltip': 'Click to remove the selected elements',
                'data-tooltip-position': 'right',
                'data-tooltip-padding': 15
            }
        }

    }, {
        name: 'rotate',
        position: ui.Selection.HandlePosition.SW,
        events: {
            pointerdown: 'startRotating',
            pointermove: 'doRotate',
            pointerup: 'stopBatch'
        },
        attrs: {
            '.handle': {
                'data-tooltip-class-name': 'small',
                'data-tooltip': 'Click and drag to rotate the selected elements',
                'data-tooltip-position': 'right',
                'data-tooltip-padding': 15
            }
        }

    }, {
        name: 'resize',
        position: ui.Selection.HandlePosition.SE,
        events: {
            pointerdown: 'startResizing',
            pointermove: 'doResize',
            pointerup: 'stopBatch'
        },
        attrs: {
            '.handle': {
                'data-tooltip-class-name': 'small',
                'data-tooltip': 'Click and drag to resize the selected elements',
                'data-tooltip-position': 'left',
                'data-tooltip-padding': 15
            }
        }
    }]
};
