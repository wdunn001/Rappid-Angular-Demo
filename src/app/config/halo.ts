import {ui} from '../../../rappid/build/rappid.min';
import Position = ui.Halo.HandlePosition;

export const halo = {
    handles: [
        {
            name: 'remove',
            position: Position.NW,
            events: { pointerdown: 'removeElement' },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click to remove the object',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }
        },
        {
            name: 'fork',
            position: Position.NE,
            events: { pointerdown: 'startForking', pointermove: 'doFork', pointerup: 'stopForking' },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to clone and connect the object in one go',
                    'data-tooltip-position': 'left',
                    'data-tooltip-padding': 15
                }
            }
        },
        {
            name: 'clone',
            position: Position.SE,
            events: { pointerdown: 'startCloning', pointermove: 'doClone', pointerup: 'stopCloning' },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to clone the object',
                    'data-tooltip-position': 'left',
                    'data-tooltip-padding': 15
                }
            }
        },
        {
            name: 'unlink',
            position: Position.W,
            events: { pointerdown: 'unlinkElement' },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click to break all connections to other objects',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }
        },
        {
            name: 'link',
            position: Position.E,
            events: { pointerdown: 'startLinking', pointermove: 'doLink', pointerup: 'stopLinking' },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to connect the object',
                    'data-tooltip-position': 'left',
                    'data-tooltip-padding': 15
                }
            }
        },
        {
            name: 'rotate',
            position: Position.SW,
            events: { pointerdown: 'startRotating', pointermove: 'doRotate', pointerup: 'stopBatch' },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to rotate the object',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }
        }
    ]
};
