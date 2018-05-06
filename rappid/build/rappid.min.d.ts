/*! Rappid v2.2.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2018-05-03 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/



// Definitions by:
// Aidan Reel <http://github.com/areel>,
// David Durman <http://github.com/DavidDurman>,
// Ewout Van Gossum <https://github.com/DenEwout>,
// Federico Caselli <https://github.com/CaselIT>,
// Chris Moran <https://github.com/ChrisMoran>
// Michael MacFadden https://github.com/mmacfadden

// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// typings: https://github.com/CaselIT/typings-jointjs

/// <reference types="backbone" />

import * as Backbone from "backbone";

export as namespace joint;

export namespace g {

    export interface PlainPoint {
        x: number;
        y: number;
    }

    export interface PlainRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    type CardinalDirection = 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N';

    type RectangleSides = 'left' | 'right' | 'top' | 'bottom';

    export function normalizeAngle(angle: number): number;

    export function snapToGrid(val: number, gridSize: number): number;

    export function toDeg(rad: number): number;

    export function toRad(deg: number, over360?: boolean): number;

    class Ellipse {

        x: number;
        y: number;
        a: number;
        b: number;

        constructor(center: PlainPoint, a: number, b: number);
        constructor(ellipse: Ellipse);

        bbox(): Rect;

        clone(): Ellipse;

        normalizedDistance(point: PlainPoint): number;

        inflate(dx?: number, dy?: number): this;

        containsPoint(p: PlainPoint): boolean;

        center(): Point;

        tangentTheta(p: PlainPoint): number;

        equals(ellipse: Ellipse): boolean;

        intersectionWithLineFromCenterToPoint(p: PlainPoint, angle?: number): Point;

        toString(): string;

        static fromRect(rect: PlainRect): Ellipse;
    }

    class Line {

        start: Point;
        end: Point;

        constructor(p1: PlainPoint | string, p2: PlainPoint | string);
        constructor(line: Line);

        bearing(): CardinalDirection;

        clone(): Line;

        equals(line: Line): boolean;

        intersect(line: Line): Point | null;
        intersect(rect: Rect): Point[] | null;

        length(): number;

        midpoint(): Point;

        pointAt(t: number): Point;

        pointOffset(p: PlainPoint): number;

        vector(): Point;

        closestPoint(p: PlainPoint | string): Point;

        closestPointNormalizedLength(p: PlainPoint | string): number;

        squaredLength(): number;

        toString(): string;
    }

    class Point implements PlainPoint {

        x: number;
        y: number;

        constructor(x: number, y: number);
        constructor(p: PlainPoint | string);

        adhereToRect(r: Rect): this;

        bearing(p: Point): CardinalDirection;

        changeInAngle(dx: number, dy: number, ref: PlainPoint | string): number;

        clone(): Point;

        difference(dx: number, dy?: number): Point;
        difference(p: PlainPoint): Point;

        distance(p: PlainPoint | string): number;

        squaredDistance(p: PlainPoint | string): number;

        equals(p: Point): boolean;

        magnitude(): number;

        manhattanDistance(p: PlainPoint): number;

        move(ref: PlainPoint | string, distance: number): this;

        normalize(length: number): this;

        offset(dx: number, dy?: number): this;
        offset(p: PlainPoint): this;

        reflection(ref: PlainPoint | string): Point;

        rotate(origin: PlainPoint | string, angle: number): this;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        snapToGrid(gx: number, gy?: number): this;

        theta(p: PlainPoint | string): number;

        angleBetween(p1: PlainPoint, p2: PlainPoint) : number;

        vectorAngle(p: PlainPoint) : number;

        toJSON(): PlainPoint;

        toPolar(origin: PlainPoint | string): this;

        toString(): string;

        update(x: number, y?: number): this;

        dot(p: PlainPoint): number;

        cross(p1: PlainPoint, p2: PlainPoint) : number;

        static fromPolar(distance: number, angle: number, origin?: PlainPoint | string): Point;

        static random(x1: number, x2: number, y1: number, y2: number): Point;
    }

    class Rect implements PlainRect {

        x: number;
        y: number;
        width: number;
        height: number;

        constructor(x?: number, y?: number, width?: number, height?: number);
        constructor(r: PlainRect);

        bbox(angle?: number): Rect;

        bottomLeft(): Point;

        bottomLine(): Line;

        bottomMiddle(): Point;

        center(): Point;

        clone(): Rect;

        containsPoint(p: PlainPoint | string): boolean;

        containsRect(r: PlainRect): boolean;

        corner(): Point;

        equals(r: PlainRect): boolean;

        intersect(r: Rect): Rect | null;

        intersectionWithLineFromCenterToPoint(p: PlainPoint | string, angle?: number): Point;

        leftLine(): Line;

        leftMiddle(): Point;

        moveAndExpand(r: PlainRect): this;

        offset(dx: number, dy?: number): this;
        offset(p: PlainPoint): this;

        inflate(dx?: number, dy?: number): this;

        normalize(): this;

        origin(): Point;

        pointNearestToPoint(point: PlainPoint | string): Point;

        rightLine(): Line;

        rightMiddle(): Point;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        sideNearestToPoint(point: PlainPoint | string): RectangleSides;

        snapToGrid(gx: number, gy?: number): this;

        topLine(): Line;

        topMiddle(): Point;

        topRight(): Point;

        toJSON(): PlainRect;

        toString(): string;

        union(rect: PlainRect): Rect;

        static fromEllipse(e: Ellipse): Rect;
    }

    namespace bezier {

        interface IBezierCurve {
            p0: Point;
            p1: Point;
            p2: Point;
            p3: Point;
        }

        export function curveThroughPoints(points: PlainPoint[] | Point[]): string[];

        export function getCurveControlPoints(points: PlainPoint[] | Point[]): [Point[], Point[]];

        export function getCurveDivider(
            p0: string | PlainPoint,
            p1: string | PlainPoint,
            p2: string | PlainPoint,
            p3: string | PlainPoint
        ): (t: number) => [IBezierCurve, IBezierCurve];

        export function getFirectControlPoints(rhs: number[]): number[];

        export function getInversionSolver(
            p0: PlainPoint,
            p1: PlainPoint,
            p2: PlainPoint,
            p3: PlainPoint
        ): (p: PlainPoint) => number;
    }

    namespace scale {

        export function linear(domain: [number, number], range: [number, number], value: number): number;
    }
}

export function V(
    svg: SVGElement | Vectorizer | string,
    attrs?: { [key: string]: any },
    children?: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]
): Vectorizer;

export namespace Vectorizer {

    interface RotateOptions {
        absolute?: boolean;
    }

    interface AnnotateStringOptions {
        includeAnnotationIndices?: boolean;
        offset?: number;
    }

    interface TextOptions {
        eol?: string;
        x?: number;
        lineHeight?: number | string;
        textPath?: string | { [key: string]: any };
        annotations?: TextAnnotation[];
        includeAnnotationIndices?: boolean;
    }

    interface GetBBoxOptions {
        target?: SVGElement | Vectorizer;
        recursive?: boolean;
    }

    interface TransformOptions {
        absolute?: boolean;
    }

    interface ParseXMLOptions {
        async?: boolean;
    }

    interface TextAnnotation {
        start: number;
        end: number;
        attrs: { [key: string]: any };
    }

    // modifiable Matrix. SVGMatrix doesn't allow set on properties or a constructor.
    interface Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;
    }

    interface Sample {
        x: number;
        y: number;
        distance: number;
    }

    interface DecomposedTransformation {
        translateX: number;
        translateY: number;
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        rotation: number;
    }

    interface RoundedRect extends g.PlainRect {
        'rx'?: number;
        'ry'?: number;
        'top-rx'?: number;
        'top-ry'?: number;
        'bottom-rx'?: number;
        'bottom-ry'?: number;
    }

    interface Rotation {
        angle: number;
        cx?: number;
        cy?: number;
    }

    interface Translation {
        tx: number;
        ty: number;
    }

    interface Scale {
        sx: number;
        sy: number;
    }

    interface Transform {
        value: string;
        translate: Translation;
        rotate: Rotation;
        scale: Scale;
    }

    interface QualifiedAttribute {
        ns: string | null;
        local: string;
    }
}

export class Vectorizer {

    node: SVGElement;

    constructor(
        svg: string | SVGElement,
        attrs?: { [key: string]: any },
        children?: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]
    );

    getTransformToElement(elem: SVGGElement | Vectorizer): SVGMatrix;

    transform(): SVGMatrix;
    transform(matrix: SVGMatrix | Vectorizer.Matrix, opt?: Vectorizer.TransformOptions): this;

    translate(): Vectorizer.Translation;
    translate(tx: number, ty?: number, opt?: Vectorizer.TransformOptions): this;

    rotate(): Vectorizer.Rotation;
    rotate(angle: number, cx?: number, cy?: number, opt?: Vectorizer.RotateOptions): this;

    scale(): Vectorizer.Scale;
    scale(sx: number, sy: number): this;

    bbox(withoutTransformations?: boolean, target?: SVGElement | Vectorizer): g.Rect;

    getBBox(opt?: Vectorizer.GetBBoxOptions) : g.Rect;

    text(content: string, opt?: Vectorizer.TextOptions): this;

    removeAttr(name: string): this;

    attr(): { [key: string]: string };
    attr(name: string): string | null;
    attr(name: string, value: any): this;
    attr(attrs: { [key: string]: any }): this;

    remove(): this;

    empty(): this;

    append(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    prepend(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    before(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    appendTo(el: SVGElement | Vectorizer) : this;

    // returns either this or Vectorizer, no point in specifying this.
    svg(): Vectorizer;

    defs(): Vectorizer | undefined;

    clone(): Vectorizer;

    findOne(selector: string): Vectorizer | undefined;

    find(selector: string): Vectorizer[];

    children(): Vectorizer[];

    index(): number;

    findParentByClass(className: string, terminator?: SVGElement): Vectorizer | null;

    contains(el: SVGElement | Vectorizer): boolean;

    toLocalPoint(x: number, y: number): SVGPoint;

    translateCenterToPoint(p: g.PlainPoint): this;

    translateAndAutoOrient(position: g.PlainPoint, reference: g.PlainPoint, target?: SVGElement | Vectorizer): this;

    animateAlongPath(attrs: { [key: string]: any }, path: SVGElement | Vectorizer): void;

    hasClass(className: string): boolean;

    addClass(className: string): Vectorizer;

    removeClass(className: string): this;

    toggleClass(className: string, switchArg?: boolean): this;

    sample(interval?: number): Vectorizer.Sample[];

    convertToPath(): Vectorizer;

    convertToPathData(): string;

    findIntersection(ref: g.PlainPoint, target: SVGElement | Vectorizer): g.PlainPoint | undefined;

    private setAttributes(attrs: { [key: string]: any }): this;

    private setAttribute(name: string, value: string): this;

    static createSVGDocument(content: string): Document;

    static uniqueId(): string;

    static ensureId(node: SVGElement | Vectorizer): string;

    static sanitizeText(text: string): string;

    static isUndefined(value: any): boolean;

    static isString(value: any): boolean;

    static isObject(value: any): boolean;

    static isArray(value: any): boolean;

    static parseXML(data: string, opt?: Vectorizer.ParseXMLOptions): XMLDocument;

    static qualifyAttr(name: string): Vectorizer.QualifiedAttribute;

    static transformStringToMatrix(transform: string): SVGMatrix;

    static matrixToTransformString(matrix: SVGMatrix | Vectorizer.Matrix): string;

    static parseTransformString(transform: string): Vectorizer.Transform;

    static deltaTransformPoint(matrix: SVGMatrix | Vectorizer.Matrix, point: SVGPoint | g.PlainPoint): g.PlainPoint;

    static decomposeMatrix(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.DecomposedTransformation;

    static matrixToScale(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Scale;

    static matrixToRotate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Rotation;

    static matrixToTranslate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Translation;

    static isV(value: any): boolean;

    static isVElement(value: any): boolean;

    static createSVGMatrix(matrix: SVGMatrix | Vectorizer.Matrix): SVGMatrix;

    static createSVGTransform(matrix?: SVGMatrix | Vectorizer.Matrix): SVGTransform;

    static createSVGPoint(x: number, y: number): SVGPoint;

    static transformRect(r: g.PlainRect, matrix: SVGMatrix): g.Rect;

    static transformPoint(p: g.PlainPoint, matrix: SVGMatrix): g.Point;

    static styleToObject(styleString: string): { [key: string]: string };

    static createSlicePathData(innerRadius: number, outRadius: number, startAngle: number, endAngle: number): string;

    static mergeAttrs(a: any, b: any): any;

    static annotateString(t: string, annotations: Vectorizer.TextAnnotation[], opt?: Vectorizer.AnnotateStringOptions): Array< string | { [key: string]: any }> ;

    static findAnnotationsAtIndex(annotations: Vectorizer.TextAnnotation[], index: number): Vectorizer.TextAnnotation[];

    static findAnnotationsBetweenIndexes(annotations: Vectorizer.TextAnnotation[], start: number, end: number): Vectorizer.TextAnnotation[];

    static shiftAnnotations(annotations: Vectorizer.TextAnnotation[], index: number, offset: number): Vectorizer.TextAnnotation[];

    static convertLineToPathData(line: string | SVGElement | Vectorizer): string;

    static convertPolygonToPathData(line: string | SVGElement | Vectorizer): string;

    static convertPolylineToPathData(line: string | SVGElement | Vectorizer): string;

    static svgPointsToPath(points: g.PlainPoint[] | SVGPoint[]): string;

    static getPointsFromSvgNode(node: SVGElement | Vectorizer): SVGPoint[];

    static convertCircleToPathData(circle: string | SVGElement | Vectorizer): string;

    static convertEllipseToPathData(ellipse: string | SVGElement | Vectorizer): string;

    static convertRectToPathData(rect: string | SVGElement | Vectorizer): string;

    static rectToPath(r: Vectorizer.RoundedRect): string;

    static toNode(el: SVGElement | Vectorizer | SVGElement[]): SVGElement;
}

export namespace dia {

    type Point = g.PlainPoint;

    type BBox = g.PlainRect;

    type Size = Pick<BBox, 'width' | 'height'>;

    type PaddingJSON = {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number
    };

    type Padding = number | PaddingJSON;

    type Direction =
        'left' | 'right' | 'top' | 'bottom' | 'top-right' |
        'top-left' | 'bottom-left' | 'bottom-right';

    export namespace Graph {

        interface ConnectionOptions extends Cell.EmbeddableOptions {
            inbound?: boolean;
            outbound?: boolean;
        }

        interface ExploreOptions extends ConnectionOptions {
            breadthFirst?: boolean;
        }
    }

    class Graph extends Backbone.Model {

        constructor(attributes?: any, opt?: { cellNamespace?: any, cellModel?: typeof Cell });

        addCell(cell: Cell | Cell[], opt?: { [key: string]: any }): this;

        addCells(cells: Cell[], opt?: { [key: string]: any }): this;

        resetCells(cells: Cell[], opt?: { [key: string]: any }): this;

        getCell(id: string | number | Cell): Cell;

        getElements(): Element[];

        getLinks(): Link[];

        getCells(): Cell[];

        getFirstCell(): Cell | undefined;

        getLastCell(): Cell | undefined;

        getConnectedLinks(cell: Cell, opt?: Graph.ConnectionOptions): Link[];

        disconnectLinks(cell: Cell, opt?: { [key: string]: any }): void;

        removeLinks(cell: Cell, opt?: { [key: string]: any }): void;

        translate(tx: number, ty?: number, opt?: Element.TranslateOptions): this;

        cloneCells(cells: Cell[]): { [id: string]: Cell };

        getSubgraph(cells: Cell[], opt?: Cell.EmbeddableOptions): Cell[];

        cloneSubgraph(cells: Cell[], opt?: Cell.EmbeddableOptions): { [id: string]: Cell };

        dfs(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ConnectionOptions): void;

        bfs(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ConnectionOptions): void;

        search(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ExploreOptions): void;

        getSuccessors(element: Element, opt?: Graph.ExploreOptions): Element[];

        getPredecessors(element: Element, opt?: Graph.ExploreOptions): Element[];

        isSuccessor(elementA: Element, elementB: Element): boolean;

        isPredecessor(elementA: Element, elementB: Element): boolean;

        isSource(element: Element): boolean;

        isSink(element: Element): boolean;

        getSources(): Element[];

        getSinks(): Element[];

        getNeighbors(element: Element, opt?: Graph.ConnectionOptions): Element[];

        isNeighbor(elementA: Element, elementB: Element, opt?: Graph.ConnectionOptions): boolean;

        getCommonAncestor(...cells: Cell[]): Element | undefined;

        toJSON(): any;

        fromJSON(json: any, opt?: { [key: string]: any }): this;

        clear(opt?: { [key: string]: any }): this;

        findModelsFromPoint(p: Point): Element[];

        findModelsInArea(rect: BBox, opt?: { strict?: boolean }): Element[];

        findModelsUnderElement(element: Element, opt?: {
            searchBy?: 'bottomLeft' | 'bottomMiddle' | 'center' |
                'corner' | 'leftMiddle' | 'origin' | 'rightMiddle' |
                'topMiddle' | 'topRight' | 'bbox'
        }): Element[];

        getBBox(cells?: Cell[], opt?: Cell.EmbeddableOptions): g.Rect | null;

        getCellsBBox(cells: Cell[], opt?: Cell.EmbeddableOptions): g.Rect | null;

        hasActiveBatch(name?: string): boolean;

        maxZIndex(): number;

        removeCells(cells: Cell[], opt?: Cell.DisconnectableOptions): this;

        resize(width: number, height: number, opt?: { [key: string]: any }): this;

        resizeCells(width: number, height: number, cells: Cell[], opt?: { [key: string]: any }): this;

        startBatch(name: string, data?: { [key: string]: any }): this;

        stopBatch(name: string, data?: { [key: string]: any }): this;

        toGraphLib(opt?: { [key: string]: any }): any;

        fromGraphLib(glGraph: any, opt?: { [key: string]: any }): this;
    }

    // dia.Cell

    export namespace Cell {

        interface GenericAttributes<T> {
            attrs?: T;
            z?: number;
        }

        interface Selectors {
            [selector: string]: attributes.SVGAttributes;
        }

        interface Attributes extends GenericAttributes<Selectors> {
            [key: string]: any;
        }

        interface Constructor<T extends Backbone.Model> {
            new (options?: { id: string }): T
        }

        interface EmbeddableOptions {
            deep?: boolean;
        }

        interface DisconnectableOptions {
            disconnectLinks?: boolean;
        }

        interface TransitionOptions {
            delay?: number;
            duration?: number;
            timingFunction?: util.timing.TimingFunction;
            valueFunction?: util.interpolate.InterpolateFunction<any>;
        }
    }

    class Cell extends Backbone.Model {

        constructor(attributes?: Cell.Attributes, opt?: { [key: string]: any });

        id: string | number;

        graph: Graph;

        toJSON(): any;

        remove(opt?: Cell.DisconnectableOptions): this;

        toFront(opt?: Cell.EmbeddableOptions): this;

        toBack(opt?: Cell.EmbeddableOptions): this;

        getAncestors(): Cell[];

        getEmbeddedCells(opt?: { deep?: boolean, breadthFirst?: boolean }): Cell[];

        isEmbeddedIn(cell: Cell, opt?: Cell.EmbeddableOptions): boolean;

        isEmbedded(): boolean;

        prop(key: string | string[]): any;
        prop(object: Cell.Attributes): this;
        prop(key: string | string[], value: any, opt?: { [key: string]: any }): this;

        removeProp(path: string | string[], opt?: { [key: string]: any }): this;

        attr(key?: string): any;
        attr(object: Cell.Selectors): this;
        attr(key: string, value: any): this;

        clone(): Cell;
        clone(opt: Cell.EmbeddableOptions): Cell | Cell[];

        removeAttr(path: string | string[], opt?: { [key: string]: any }): this;

        transition(path: string, value?: any, opt?: Cell.TransitionOptions, delim?: string): number;

        getTransitions(): string[];

        stopTransitions(path?: string, delim?: string): this;

        embed(cell: Cell, opt?: { [key: string]: any }): this;

        unembed(cell: Cell, opt?: { [key: string]: any }): this;

        addTo(graph: Graph, opt?: { [key: string]: any }): this;

        findView(paper: Paper): CellView;

        isLink(): boolean;

        isElement(): boolean;

        startBatch(name: string, opt?: { [key: string]: any }): this;

        stopBatch(name: string, opt?: { [key: string]: any }): this;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Cell>;

        /**
         * @deprecated
         */
        protected processPorts(): void;
    }

    // dia.Element

    export namespace Element {

        interface GenericAttributes<T> extends Cell.GenericAttributes<T> {
            position?: Point;
            size?: Size;
            angle?: number;
            ports?: {
                groups?: { [key: string]: Port },
                items?: Port[]
            }
        }

        interface Attributes extends GenericAttributes<Cell.Selectors> {
            [key: string]: any
        }

        interface Port {
            id?: string;
            markup?: string;
            group?: string;
            attrs?: Cell.Selectors;
            args?: { [key: string]: any };
            size?: Size;
            label?: {
                size?: Size;
                markup?: string;
                position?: any;
                args?: any;
            }
            z?: number | 'auto';
        }

        interface PortPosition extends Point {
            angle: number;
        }

        interface TranslateOptions {
            restrictedArea?: BBox;
            transition?: Cell.TransitionOptions;
        }
    }

    class Element extends Cell {

        constructor(attributes?: Element.Attributes, opt?: { [key: string]: any });

        translate(tx: number, ty?: number, opt?: Element.TranslateOptions): this;

        position(opt?: { parentRelative?: boolean, [key: string]: any }): g.Point;
        position(x: number, y: number, opt?: { parentRelative?: boolean, deep?: boolean, [key: string]: any }): this;

        size(): Size;
        size(width: number, height?: number, opt?: { direction?: Direction, [key: string]: any }): this;

        resize(width: number, height: number, opt?: { direction?: Direction, [key: string]: any }): this;

        rotate(deg: number, absolute?: boolean, origin?: Point, opt?: { [key: string]: any }): this;

        scale(scaleX: number, scaleY: number, origin?: Point, opt?: { [key: string]: any }): this;

        fitEmbeds(opt?: { deep?: boolean, padding?: Padding }): this;

        getBBox(opt?: Cell.EmbeddableOptions): g.Rect;

        addPort(port: Element.Port, opt?: { [key: string]: any }): this;

        addPorts(ports: Element.Port[], opt?: { [key: string]: any }): this;

        removePort(port: string | Element.Port, opt?: { [key: string]: any }): this;

        hasPorts(): boolean;

        hasPort(id: string): boolean;

        getPorts(): Element.Port[];

        getPort(id: string): Element.Port;

        getPortsPositions(groupName: string): { [id: string]: Element.PortPosition };

        getPortIndex(port: string | Element.Port): number;

        portProp(portId: string, path: any, value?: any, opt?: { [key: string]: any }): Element;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Element>;
    }

    // dia.Link

    export namespace Link {

        interface GenericAttributes<T> extends Cell.GenericAttributes<T> {
            source?: Point | { id: string, selector?: string, port?: string };
            target?: Point | { id: string, selector?: string, port?: string };
            labels?: Label[];
            vertices?: Point[];
            smooth?: boolean;
            router?: routers.RouterJSON;
            connector?: connectors.ConnectorJSON;
        }

        interface LinkSelectors extends Cell.Selectors {
            '.connection'?: attributes.SVGPathAttributes;
            '.connection-wrap'?: attributes.SVGPathAttributes;
            '.marker-source'?: attributes.SVGPathAttributes;
            '.marker-target'?: attributes.SVGPathAttributes;
            '.labels'?: attributes.SVGAttributes;
            '.marker-vertices'?: attributes.SVGAttributes;
            '.marker-arrowheads'?: attributes.SVGAttributes;
            '.link-tools'?: attributes.SVGAttributes;
        }

        interface Attributes extends Cell.GenericAttributes<LinkSelectors> {
            [key: string]: any;
        }

        interface LabelPosition {
            distance: number;
            offset: number | { x: number; y: number; }
        }

        interface Label {
            position: LabelPosition | number;
            attrs?: Cell.Selectors;
            size?: Size;
        }
    }

    class Link extends Cell {

        markup: string;
        labelMarkup: string;
        toolMarkup: string;
        vertexMarkup: string;
        arrowHeadMarkup: string;

        constructor(attributes?: Link.Attributes, opt?: { [key: string]: any });

        disconnect(): this;

        label(index?: number): any;
        label(index: number, value: Link.Label, opt?: { [key: string]: any }): this;

        reparent(opt?: { [key: string]: any }): Element;

        getSourceElement(): null | Element;

        getTargetElement(): null | Element;

        hasLoop(opt?: Cell.EmbeddableOptions): boolean;

        getRelationshipAncestor(): undefined | Element;

        isRelationshipEmbeddedIn(cell: Cell): boolean;

        applyToPoints(fn: (p: Point) => Point, opt?: { [key: string]: any }): this;

        scale(sx: number, sy: number, origin?: Point, opt?: { [key: string]: any }): this;

        translate(tx: number, ty: number, opt?: { [key: string]: any }): this;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Link>;
    }

    // dia.CellView

    export namespace CellView {

        interface Options<T extends Cell> extends mvc.ViewOptions<T> {
            id?: string
        }

        interface InteractivityOptions extends ElementView.InteractivityOptions, LinkView.InteractivityOptions {

        }
    }

    abstract class CellViewGeneric<T extends Cell> extends mvc.View<T> {

        constructor(opt?: CellView.Options<T>);

        highlight(el?: SVGElement | JQuery | string, opt?: { [key: string]: any }): this;

        unhighlight(el?: SVGElement | JQuery | string, opt?: { [key: string]: any }): this;

        can(feature: string): boolean;

        findMagnet(el: SVGElement | JQuery | string): SVGElement | undefined;

        findBySelector(selector: string, root?: SVGElement | JQuery | string): JQuery;

        getSelector(el: SVGElement, prevSelector?: string): string;

        getStrokeBBox(el?: SVGElement): g.Rect;

        notify(eventName: string, ...eventArguments: any[]): void;

        protected mouseover(evt: JQuery.Event): void;

        protected mousewheel(evt: JQuery.Event, x: number, y: number, delta: number): void

        protected pointerclick(evt: JQuery.Event, x: number, y: number): void;

        protected pointerdblclick(evt: JQuery.Event, x: number, y: number): void;

        protected pointerdown(evt: JQuery.Event, x: number, y: number): void;

        protected pointermove(evt: JQuery.Event, x: number, y: number): void;

        protected pointerup(evt: JQuery.Event, x: number, y: number): void;
    }

    class CellView extends CellViewGeneric<Cell> {

    }

    // dia.ElementView


    export namespace ElementView {

        interface InteractivityOptions {
            elementMove?: boolean;
            addLinkFromMagnet?: boolean;
        }
    }

    class ElementView extends CellViewGeneric<Element> {

        getBBox(opt?: { useModelGeometry?: boolean }): g.Rect;

        update(element: Element, renderingOnlyAttrs?: { [key: string]: any }): void;

        setInteractivity(value: boolean | ElementView.InteractivityOptions): void;

        protected renderMarkup(): void;
    }

    // dia.LinkView


    export namespace LinkView {

        interface InteractivityOptions {
            vertexAdd?: boolean,
            vertexMove?: boolean,
            vertexRemove?: boolean;
            arrowheadMove?: boolean;
            labelMove?: boolean;
            useLinkTools?: boolean;
        }

        interface GetConnectionPoint {
            (
                linkView: LinkView,
                view: ElementView,
                magnet: SVGElement,
                reference: Point,
                end: 'source' | 'target'
            ): Point;
        }
    }

    class LinkView extends CellViewGeneric<Link> {

        options: {
            shortLinkLength?: number,
            doubleLinkTools?: boolean,
            longLinkLength?: number,
            linkToolsOffset?: number,
            doubleLinkToolsOffset?: number,
            sampleInterval?: number
        };

        sendToken(token: SVGElement, duration?: number, callback?: () => void): void;
        sendToken(token: SVGElement, opt?: { duration?: number, direction?: string; }, callback?: () => void): void;

        addVertex(vertex: Point): number;

        getConnectionLength(): number;

        getPointAtLength(length: number): g.Point;

        update(link: Link, attributes: any, opt?: { [key: string]: any }): this;

        setInteractivity(value: boolean | LinkView.InteractivityOptions): void;

        protected onLabelsChange(link: Link, labels: Link.Label[], opt: { [key: string]: any }): void;

        protected onToolsChange(link: Link, toolsMarkup: string, opt: { [key: string]: any }): void;

        protected onVerticesChange(link: Link, vertices: Point[], opt: { [key: string]: any }): void;

        protected onSourceChange(element: Element, sourceEnd: any, opt: { [key: string]: any }): void;

        protected onTargetChange(element: Element, targetEnd: any, opt: { [key: string]: any }): void;
    }

    // dia.Paper

    export namespace Paper {

        interface GradientOptions {
            id?: string;
            type: 'linearGradient' | 'radialGradient';
            stops: Array<{
                offset: string;
                color: string;
                opacity?: number;
            }>;
        }

        interface GridOptions {
            color?: string;
            thickness?: number;
            name?: 'dot' | 'fixedDot' | 'mesh' | 'doubleMesh';
            args?: Array<{ [key: string]: any }> | { [key: string]: any };
        }

        interface BackgroundOptions {
            color?: string;
            image?: string;
            quality?: number;
            position?: Point | string;
            size?: Size | string;
            repeat?: string;
            opacity?: number;
            waterMarkAngle?: number;
        }

        interface Options extends mvc.ViewOptions<Graph> {
            // appearance
            width?: number;
            height?: number;
            origin?: Point;
            perpendicularLinks?: boolean;
            linkConnectionPoint?: LinkView.GetConnectionPoint;
            drawGrid?: boolean | GridOptions | GridOptions[];
            background?: BackgroundOptions;
            async?: boolean | { batchSize: number };
            // interactions
            gridSize?: number;
            highlighting?: { [type: string]: highlighters.HighlighterJSON };
            interactive?: ((cellView: CellView, event: string) => boolean) | boolean | CellView.InteractivityOptions
            snapLinks?: boolean | { radius: number };
            markAvailable?: boolean;
            // validations
            validateMagnet?: (cellView: CellView, magnet: SVGElement) => boolean;
            validateConnection?: (cellViewS: CellView, magnetS: SVGElement, cellViewT: CellView, magnetT: SVGElement, end: 'source' | 'target', linkView: LinkView) => boolean;
            restrictTranslate?: ((elementView: ElementView) => BBox) | boolean;
            multiLinks?: boolean;
            linkPinning?: boolean;
            // events
            guard?: (evt: JQuery.Event, view: CellView) => boolean;
            preventContextMenu?: boolean;
            preventDefaultBlankAction?: boolean;
            clickThreshold?: number;
            moveThreshold?: number;
            // views
            elementView?: typeof ElementView | ((element: Element) => typeof ElementView);
            linkView?: typeof LinkView | ((link: Link) => typeof LinkView);
            // embedding
            embeddingMode?: boolean;
            findParentBy?: 'bbox' | 'center' | 'origin' | 'corner' | 'topRight' | 'bottomLeft';
            validateEmbedding?: (childView: ElementView, parentView: ElementView) => boolean;
            // default views, models & attributes
            cellViewNamespace?: any;
            highlighterNamespace?: any;
            defaultLink?: ((cellView: CellView, magnet: SVGElement) => Link) | Link;
            defaultRouter?: routers.Router | routers.RouterJSON;
            defaultConnector?: connectors.Connector | connectors.ConnectorJSON;
        }

        interface ScaleContentOptions {
            padding?: number;
            preserveAspectRatio?: boolean;
            minScale?: number;
            minScaleX?: number;
            minScaleY?: number;
            maxScale?: number;
            maxScaleX?: number;
            maxScaleY?: number;
            scaleGrid?: number;
            fittingBBox?: BBox;
        }

        interface FitToContentOptions {
            gridWidth?: number;
            gridHeight?: number;
            padding?: Padding;
            allowNewOrigin?: 'negative' | 'positive' | 'any';
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
        }

    }

    class Paper extends mvc.View<Graph> {

        constructor(opt: Paper.Options);

        options: Paper.Options;
        svg: SVGElement;
        viewport: SVGGElement;
        defs: SVGDefsElement;

        matrix(): SVGMatrix;
        matrix(ctm: SVGMatrix | Vectorizer.Matrix): this;

        clientMatrix(): SVGMatrix;

        clientOffset(): g.Point;

        pageOffset(): g.Point;

        clientToLocalPoint(x: number, y: number): g.Point;
        clientToLocalPoint(point: Point): g.Point;

        clientToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        clientToLocalRect(rect: BBox): g.Rect;

        localToClientPoint(x: number, y: number): g.Point;
        localToClientPoint(point: Point): g.Point;

        localToClientRect(x: number, y: number, width: number, height: number): g.Rect;
        localToClientRect(rect: BBox): g.Rect;

        localToPagePoint(x: number, y: number): g.Point;
        localToPagePoint(point: Point): g.Point;

        localToPageRect(x: number, y: number, width: number, height: number): g.Rect;
        localToPageRect(rect: BBox): g.Rect;

        localToPaperPoint(x: number, y: number): g.Point;
        localToPaperPoint(point: Point): g.Point;

        localToPaperRect(x: number, y: number, width: number, height: number): g.Rect;
        localToPaperRect(rect: BBox): g.Rect;

        pageToLocalPoint(x: number, y: number): g.Point;
        pageToLocalPoint(point: Point): g.Point;

        pageToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        pageToLocalRect(rect: BBox): g.Rect;

        paperToLocalPoint(x: number, y: number): g.Point;
        paperToLocalPoint(point: Point): g.Point;

        paperToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        paperToLocalRect(x: BBox): g.Rect;

        snapToGrid(x: number, y: number): g.Point;
        snapToGrid(point: Point): g.Point;

        defineFilter(filter: { [key: string]: any }): string;

        defineGradient(gradient: Paper.GradientOptions): string;

        defineMarker(marker: { [key: string]: any }): string;

        isDefined(defId: string): boolean;

        getArea(): g.Rect;

        getRestrictedArea(): g.Rect | undefined;

        getContentBBox(): g.Rect;

        findView<T extends ElementView | LinkView>(element: string | JQuery | SVGElement): T;

        findViewByModel<T extends ElementView | LinkView>(model: Cell | string | number): T;

        findViewsFromPoint(point: string | Point): ElementView[];

        findViewsInArea(rect: BBox, opt?: { strict?: boolean }): ElementView[];

        fitToContent(opt?: Paper.FitToContentOptions): void;
        fitToContent(gridWidth?: number, gridHeight?: number, padding?: number, opt?: any): void;

        scaleContentToFit(opt?: Paper.ScaleContentOptions): void;

        cancelRenderViews(): void;

        drawBackground(opt?: Paper.BackgroundOptions): this;

        drawGrid(opt?: Paper.GridOptions | Paper.GridOptions[]): this;

        clearGrid(): this;

        getDefaultLink(cellView: CellView, magnet: SVGElement): Link;

        getModelById(id: string | number | Cell): Cell;

        setDimensions(width: number, height: number): void;

        setGridSize(gridSize: number): this;

        setInteractivity(value: any): void;

        setOrigin(x: number, y: number): this;

        scale(): Vectorizer.Scale;
        scale(sx: number, sy?: number, ox?: number, oy?: number): this;

        translate(): Vectorizer.Translation;
        translate(tx: number, ty?: number): this;

        update(): this;

        // protected
        protected guard(evt: JQuery.Event, view: CellView): boolean;

        protected sortViews(): void;

        protected drawBackgroundImage(img: HTMLImageElement, opt: { [key: string]: any }): void;

        protected createViewForModel(cell: Cell): CellView;

        protected cloneOptions(): Paper.Options;

        protected afterRenderViews(): void;

        protected asyncRenderViews(cells: Cell[], opt?: { [key: string]: any }): void;

        protected beforeRenderViews(cells: Cell[]): Cell[];

        protected cellMouseEnter(evt: JQuery.Event): void;

        protected cellMouseleave(evt: JQuery.Event): void;

        protected cellMouseout(evt: JQuery.Event): void;

        protected cellMouseover(evt: JQuery.Event): void;

        protected contextmenu(evt: JQuery.Event): void;

        protected init(): void;

        protected mouseclick(evt: JQuery.Event): void;

        protected mousedblclick(evt: JQuery.Event): void;

        protected mousewheel(evt: JQuery.Event): void;

        protected onCellAdded(cell: Cell, graph: Graph, opt: { async?: boolean, position?: number }): void;

        protected onCellHighlight(cellView: CellView, magnetEl: SVGElement, opt?: { highlighter?: highlighters.HighlighterJSON }): void;

        protected onCellUnhighlight(cellView: CellView, magnetEl: SVGElement, opt?: { highlighter?: highlighters.HighlighterJSON }): void;

        protected onRemove(): void;

        protected pointerdown(evt: JQuery.Event): void;

        protected pointermove(evt: JQuery.Event): void;

        protected pointerup(evt: JQuery.Event): void;

        protected removeView(cell: Cell): CellView;

        protected removeViews(): void;

        protected renderView(cell: Cell): CellView;

        protected resetViews(cellsCollection: Cell[], opt: { [key: string]: any }): void;

        protected updateBackgroundColor(color: string): void;

        protected updateBackgroundImage(opt: { position?: any, size?: any }): void;
    }
}

export namespace shapes {

    interface SVGTextSelector extends dia.Cell.Selectors {
        text?: attributes.SVGTextAttributes;
    }

    interface SVGRectSelector extends dia.Cell.Selectors {
        rect?: attributes.SVGRectAttributes;
    }

    interface SVGCircleSelector extends dia.Cell.Selectors {
        circle?: attributes.SVGCircleAttributes;
    }

    interface SVGEllipseSelector extends dia.Cell.Selectors {
        ellipse?: attributes.SVGEllipseAttributes;
    }

    interface SVGPolygonSelector extends dia.Cell.Selectors {
        polygon?: attributes.SVGPolygonAttributes;
    }

    interface SVGPolylineSelector extends dia.Cell.Selectors {
        polyline?: attributes.SVGPolylineAttributes;
    }

    interface SVGImageSelector extends dia.Cell.Selectors {
        image?: attributes.SVGImageAttributes;
    }

    interface SVGPathSelector extends dia.Cell.Selectors {
        path?: attributes.SVGPathAttributes;
    }

    namespace basic {

        class Generic extends dia.Element {

        }

        class Text extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<SVGTextSelector>,
                opt?: { [key: string]: any }
            );
        }

        interface RectSelectors extends SVGTextSelector, SVGRectSelector {

        }

        class Rect extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<RectSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface CircleSelectors extends SVGTextSelector, SVGCircleSelector {

        }

        class Circle extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<CircleSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface EllipseSelectors extends SVGTextSelector, SVGEllipseSelector {

        }


        class Ellipse extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<EllipseSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface PolygonSelectors extends SVGTextSelector, SVGPolygonSelector {

        }


        class Polygon extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface PolylineSelectors extends SVGTextSelector, SVGPolylineSelector {

        }

        class Polyline extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolylineSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface ImageSelectors extends SVGTextSelector, SVGImageSelector {

        }

        class Image extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<ImageSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface PathSelectors extends SVGTextSelector, SVGPathSelector {

        }

        class Path extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PathSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Rhombus extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PathSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface TextBlockSelectors extends SVGTextSelector, SVGRectSelector {
            '.content'?: attributes.SVGTextAttributes;
        }

        class TextBlock extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<TextBlockSelectors>,
                opt?: { [key: string]: any }
            );
        }
    }

    namespace chess {

        class KingWhite extends basic.Generic {

        }

        class KingBlack extends basic.Generic {

        }

        class QueenWhite extends basic.Generic {

        }

        class QueenBlack extends basic.Generic {

        }

        class RookWhite extends basic.Generic {

        }

        class RookBlack extends basic.Generic {

        }

        class BishopWhite extends basic.Generic {

        }

        class BishopBlack extends basic.Generic {

        }

        class KnightWhite extends basic.Generic {

        }

        class KnightBlack extends basic.Generic {

        }

        class PawnWhite extends basic.Generic {

        }

        class PawnBlack extends basic.Generic {

        }
    }

    namespace devs {

        interface ModelSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGTextAttributes;
            '.body'?: attributes.SVGRectAttributes;
        }

        interface ModelAttributes extends dia.Element.GenericAttributes<ModelSelectors> {
            inPorts?: string[];
            outPorts?: string[];
        }

        class Model extends basic.Generic {

            constructor(attributes?: ModelAttributes, opt?: { [key: string]: any });

            changeInGroup(properties: any, opt?: any): boolean;

            changeOutGroup(properties: any, opt?: any): boolean;

            createPortItem(group: string, port: string): any;

            createPortItems(group: string, ports: string[]): any[];

            addOutPort(port: string, opt?: any): this;

            addInPort(port: string, opt?: any): this;

            removeOutPort(port: string, opt?: any): this;

            removeInPort(port: string, opt?: any): this;
        }

        class Coupled extends Model {

        }

        class Atomic extends Model {

        }

        class Link extends dia.Link {

        }
    }

    namespace erd {

        interface PolygonalSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGPolygonAttributes;
            '.body'?: attributes.SVGPolygonAttributes;
            'text'?: attributes.SVGTextAttributes;
        }

        interface EllipsoidSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGEllipseAttributes;
            '.body'?: attributes.SVGEllipseAttributes;
            'text'?: attributes.SVGTextAttributes;
        }

        class Entity extends basic.Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonalSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class WeakEntity extends Entity {

        }

        class Relationship extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonalSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class IdentifyingRelationship extends Relationship {

        }

        class Attribute extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<EllipsoidSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Multivalued extends Attribute {

        }

        class Derived extends Attribute {

        }

        class Key extends Attribute {

        }

        class Normal extends Attribute {

        }

        class ISA extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<basic.PolygonSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Line extends dia.Link {

            cardinality(value: string | number): void;
        }
    }

    namespace fsa {

        class State extends basic.Circle {

        }

        class StartState extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<SVGCircleSelector>,
                opt?: { [key: string]: any }
            );
        }

        interface CirculoidSelectors extends dia.Cell.Selectors {
            '.outer'?: attributes.SVGCircleAttributes;
            '.inner'?: attributes.SVGCircleAttributes;
        }

        class EndState extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<CirculoidSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Arrow extends dia.Link {

        }
    }

    namespace logic {

        abstract class Gate extends basic.Generic {

        }

        interface GateSelectors extends dia.Cell.Selectors {
            '.body'?: attributes.SVGRectAttributes;
            '.wire'?: attributes.SVGPathAttributes;
            'circle'?: attributes.SVGCircleAttributes;
            'text'?: attributes.SVGTextAttributes;
        }

        class IO extends Gate {
            constructor(
                attributes?: dia.Element.GenericAttributes<basic.CircleSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Input extends IO {

        }

        class Output extends IO {

        }

        interface Gate11Selectors extends dia.Cell.Selectors {
            '.input'?: attributes.SVGCircleAttributes;
            '.output'?: attributes.SVGCircleAttributes;
            '.body'?: attributes.SVGImageAttributes;
            'image'?: attributes.SVGImageAttributes;
        }

        class Gate11 extends Gate {
            constructor(
                attributes?: dia.Element.GenericAttributes<Gate11Selectors>,
                opt?: { [key: string]: any }
            );
        }

        interface Gate21Selectors extends dia.Cell.Selectors {
            '.input'?: attributes.SVGCircleAttributes;
            '.input1'?: attributes.SVGCircleAttributes;
            '.input2'?: attributes.SVGCircleAttributes;
            '.output'?: attributes.SVGCircleAttributes;
            '.body'?: attributes.SVGImageAttributes;
            'image'?: attributes.SVGImageAttributes;
        }

        class Gate21 extends Gate {
            constructor(
                attributes?: dia.Element.GenericAttributes<Gate21Selectors>,
                opt?: { [key: string]: any }
            );
        }

        class Repeater extends Gate11 {

            operation(input: any): any;
        }

        class Not extends Gate11 {

            operation(input: any): boolean;
        }

        class Or extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class And extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Nor extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Nand extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Xor extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Xnor extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Wire extends dia.Link {

        }
    }

    namespace org {

        interface MemberSelectors extends dia.Cell.Selectors {
            '.card'?: attributes.SVGRectAttributes;
            '.rank'?: attributes.SVGTextAttributes;
            '.name'?: attributes.SVGTextAttributes;
            'image'?: attributes.SVGImageAttributes;
        }

        class Member extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<MemberSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Arrow extends dia.Link {

        }
    }

    namespace pn {

        class Place extends basic.Generic {
            constructor(attributes?: dia.Element.Attributes, opt?: { [key: string]: any });
        }

        class PlaceView extends dia.ElementView {
            renderTokens(): void;
        }

        class Transition extends basic.Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<SVGRectSelector>,
                opt?: { [key: string]: any }
            );
        }

        class Link extends dia.Link {

        }
    }

    namespace uml {

        interface ClassAttributes extends dia.Element.GenericAttributes<SVGRectSelector> {
            name: string[];
            attributes: string[];
            methods: string[];
        }

        class Class extends basic.Generic {

            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });

            getClassName(): string[];

            protected updateRectangles(): void;
        }

        class ClassView extends dia.ElementView {

        }

        class Abstract extends Class {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class AbstractView extends ClassView {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class Interface extends Class {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class InterfaceView extends ClassView {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class Generalization extends dia.Link {

        }

        class Implementation extends dia.Link {

        }

        class Aggregation extends dia.Link {

        }

        class Composition extends dia.Link {

        }

        class Association extends dia.Link {

        }

        interface StateSelectors extends dia.Cell.Selectors {
            '.uml-state-body'?: attributes.SVGRectAttributes;
            '.uml-state-separator'?: attributes.SVGPathAttributes;
            '.uml-state-name'?: attributes.SVGTextAttributes;
            '.uml-state-events'?: attributes.SVGTextAttributes;
        }

        class State extends basic.Generic {

            constructor(
                attributes?: dia.Element.GenericAttributes<StateSelectors>,
                opt?: { [key: string]: any }
            );

            protected updateName(): void;

            protected updateEvents(): void;

            protected updatePath(): void;
        }

        class StartState extends basic.Circle {
            constructor(
                attributes?: dia.Element.GenericAttributes<basic.CircleSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface EndStateSelectors extends dia.Cell.Selectors {
            'circle.outer'?: attributes.SVGCircleAttributes;
            'circle.inner'?: attributes.SVGCircleAttributes;
        }

        class EndState extends basic.Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<EndStateSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Transition extends dia.Link {

        }
    }
}

// util

export namespace util {

    export function hashCode(str: string): string;

    export function getByPath(object: { [key: string]: any }, path: string | string[], delim?: string): any;

    export function setByPath(object: { [key: string]: any }, path: string | string[], value: any, delim?: string): any;

    export function unsetByPath(object: { [key: string]: any }, path: string | string[], delim?: string): any;

    export function flattenObject(object: { [key: string]: any }, delim?: string, stop?: (node: any) => boolean): any;

    export function uuid(): string;

    export function guid(obj?: { [key: string]: any }): string;

    export function toKebabCase(str: string): string;

    export function normalizeEvent(evt: JQuery.Event): JQuery.Event;

    export function nextFrame(callback: () => void, context?: { [key: string]: any }): number;

    export function cancelFrame(requestId: number): void;

    export var shapePerimeterConnectionPoint: dia.LinkView.GetConnectionPoint;

    export function parseCssNumber(str: string, restrictUnits?: string[]): { value: number; unit?: string; };

    export function breakText(text: string, size: dia.Size, attrs?: attributes.NativeSVGAttributes, opt?: { svgDocument?: SVGElement }): string;

    export function imageToDataUri(url: string, callback: (err: Error, dataUri: string) => void): void;

    export function getElementBBox(el: Element): dia.BBox;

    export function sortElements(
        elements: Element[] | string | JQuery,
        comparator: (a: Element, b: Element) => number
    ): Element[];

    export function setAttributesBySelector(el: Element, attrs: { [selector: string]: { [attribute: string]: any } }): void;

    export function normalizeSides(sides: number | { top?: number, bottom?: number, left?: number, right?: number }): dia.PaddingJSON;

    export function template(html: string): (data: any) => string;

    export function toggleFullScreen(el?: Element): void;

    export namespace timing {

        type TimingFunction = (time: number) => number;

        export var linear: TimingFunction;
        export var quad: TimingFunction;
        export var cubic: TimingFunction;
        export var inout: TimingFunction;
        export var exponential: TimingFunction;
        export var bounce: TimingFunction;

        export function reverse(f: TimingFunction): TimingFunction;

        export function reflect(f: TimingFunction): TimingFunction;

        export function clamp(f: TimingFunction, min?: number, max?: number): TimingFunction;

        export function back(s?: number): TimingFunction;

        export function elastic(x?: number): TimingFunction;
    }

    export namespace interpolate {

        type InterpolateFunction<T> = (start: T, end: T) => ((time: number) => T);

        export var number: InterpolateFunction<number>;
        export var object: InterpolateFunction<{ [key: string]: any }>;
        export var hexColor: InterpolateFunction<string>;
        export var unit: InterpolateFunction<string>;
    }

    export namespace filter {

        interface FilterArgumentsMap {
            'outline': {
                color?: string;
                opacity?: number;
                margin?: number;
                width?: number;
            };
            'highlight': {
                color?: string;
                blur?: number;
                opacity?: number;
                width?: number;
            };
            'blur': {
                x?: number;
                y?: number;
            };
            'dropShadow': {
                dx?: number;
                dy?: number;
                opacity?: number;
                color?: string;
                blur?: number;
            };
            'grayscale': {
                amount?: number;
            };
            'sepia': {
                amount?: number;
            };
            'saturate': {
                amount?: number;
            };
            'hueRotate': {
                angle?: number;
            };
            'invert': {
                amount?: number;
            };
            'brightness': {
                amount?: number;
            };
            'contrast': {
                amount?: number;
            };
        }

        type FilterFunction<K extends keyof FilterArgumentsMap> = (args: FilterArgumentsMap[K]) => string;

        export var outline: FilterFunction<'outline'>;
        export var highlight: FilterFunction<'highlight'>;
        export var blur: FilterFunction<'blur'>;
        export var dropShadow: FilterFunction<'dropShadow'>;
        export var grayscale: FilterFunction<'grayscale'>;
        export var sepia: FilterFunction<'sepia'>;
        export var saturate: FilterFunction<'saturate'>;
        export var hueRotate: FilterFunction<'hueRotate'>;
        export var invert: FilterFunction<'invert'>;
        export var brightness: FilterFunction<'brightness'>;
        export var contrast: FilterFunction<'contrast'>;
    }

    namespace format {

        interface NumberLocale {
            currency: [string, string],
            decimal: string,
            thousands: string,
            grouping: number[]
        }

        export function number(specifier: string, value: number, locale?: NumberLocale): string;

        export function string(str: string, value: string): string;

        export function convert(type: string, value: number, precision: number): string;

        export function round(value: number, precision?: number): number

        export function precision(value: number, precision: number): number;

        export function prefix(value: number, precision: number): { scale: (d: number) => number; symbol: string; } | undefined
    }

    // Not documented but used in examples
    /** @deprecated use lodash _.defaultsDeep */
    export function deepSupplement(objects: any, defaultIndicator?: any): any;

    // Private functions
    /** @deprecated use lodash _.assign */
    export function mixin(objects: any[]): any;

    /** @deprecated use lodash _.defaults */
    export function supplement(objects: any[]): any;

    /** @deprecated use lodash _.mixin  */
    export function deepMixin(objects: any[]): any;

}

// env

export namespace env {

    export function addTest(name: string, fn: () => boolean): void;

    export function test(name: string): boolean;
}

// layout

export namespace layout {

    export namespace DirectedGraph {

        interface Edge {
            minLen?: number;
            weight?: number;
            labelpos?: 'l' | 'c' | 'r';
            labeloffset?: number;
            width?: number;
            height?: number;
        }

        interface Node {
            width?: number;
            height?: number;
        }

        interface LayoutOptions {
            rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
            ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
            nodeSep?: number;
            edgeSep?: number;
            rankSep?: number;
            marginX?: number;
            marginY?: number;
            resizeCluster?: boolean;
            clusterPadding?: dia.Padding;
            setPosition?: (element: dia.Element, position: dia.BBox) => void;
            setVertices?: boolean | ((link: dia.Link, vertices: dia.Point[]) => void);
            setLabels?: boolean | ((link: dia.Link, position: dia.Point, points: dia.Point[]) => void);
            debugTiming?: boolean;
            exportElement?: (element: dia.Element) => Node;
            exportLink?: (link: dia.Link) => Edge;
            // deprecated
            setLinkVertices?: boolean;
        }

        export function layout(graph: dia.Graph | dia.Cell[], opt?: LayoutOptions): g.Rect;
    }
}

// mvc

export namespace mvc {

    interface ViewOptions<T extends Backbone.Model> extends Backbone.ViewOptions<T> {
        theme?: string;
    }

    class View<T extends Backbone.Model> extends Backbone.View<T> {

        constructor(opt?: ViewOptions<T>);

        theme: string;

        themeClassNamePrefix: string

        defaultTheme: string;

        requireSetThemeOverride: boolean;

        setTheme(theme: string, opt?: { override?: boolean }): this;

        getEventNamespace(): string;

        protected init(): void;

        protected onRender(): void;

        protected onSetTheme(oldTheme: string, newTheme: string): void;

        protected onRemove(): void;
    }
}

// routers

export namespace routers {

    interface NormalRouterArguments {

    }

    interface ManhattanRouterArguments {
        excludeTypes?: string[];
        excludeEnds?: 'source' | 'target';
        startDirections?: ['left' | 'right' | 'top' | 'bottom'];
        endDirections?: ['left' | 'right' | 'top' | 'bottom'];
        step?: number;
        maximumLoops?: number;
    }

    interface OrthogonalRouterArguments {
        elementPadding?: number;
    }

    interface OneSideRouterArguments {
        side?: 'bottom' | 'top' | 'left' | 'right';
        padding?: number;
    }

    interface RouterArgumentsMap {
        'normal': NormalRouterArguments;
        'manhattan': ManhattanRouterArguments;
        'metro': ManhattanRouterArguments;
        'orthogonal': OrthogonalRouterArguments;
        'oneSide': OneSideRouterArguments;
    }

    type RouterType = string & keyof RouterArgumentsMap;

    interface GenericRouter<K extends RouterType> {
        (
            points: dia.Point[],
            args?: RouterArgumentsMap[K],
            linkView?: dia.LinkView
        ): dia.Point[];
    }

    interface GenericRouterJSON<K extends RouterType> {
        name: K;
        args?: RouterArgumentsMap[K];
    }

    type Router = GenericRouter<RouterType>;

    type RouterJSON = GenericRouterJSON<RouterType>;

    export var manhattan: GenericRouter<'manhattan'>;
    export var metro: GenericRouter<'metro'>;
    export var normal: GenericRouter<'normal'>;
    export var orthogonal: GenericRouter<'orthogonal'>;
    export var oneSide: GenericRouter<'oneSide'>;
}

// connectors

export namespace connectors {

    interface NormalConnectorArguments {

    }

    interface RoundedConnectorArguments {
        radius?: number
    }

    interface SmoothConnectorArguments {

    }

    interface JumpOverConnectorArguments {
        size?: number;
        jump?: 'arc' | 'gap' | 'cubic'
    }

    interface ConnectorArgumentsMap {
        'normal': NormalConnectorArguments;
        'rounded': RoundedConnectorArguments;
        'smooth': SmoothConnectorArguments;
        'jumpover': JumpOverConnectorArguments;
    }

    type ConnectorType = string & keyof ConnectorArgumentsMap;

    interface GenericConnector<K extends ConnectorType> {
        (
            sourcePoint: dia.Point,
            targetPoint: dia.Point,
            vertices: dia.Point[],
            args?: ConnectorArgumentsMap[K],
            linkView?: dia.LinkView
        ): string;
    }

    interface GenericConnectorJSON<K extends ConnectorType> {
        name: K;
        args?: ConnectorArgumentsMap[K];
    }

    type Connector = GenericConnector<ConnectorType>;

    type ConnectorJSON = GenericConnectorJSON<ConnectorType>;

    export var normal: GenericConnector<'normal'>;
    export var rounded: GenericConnector<'rounded'>;
    export var smooth: GenericConnector<'smooth'>;
    export var jumpover: GenericConnector<'jumpover'>;
}

// highlighters

export namespace highlighters {

    interface AddClassHighlighterArguments {
        className?: string;
    }

    interface OpacityHighlighterArguments {

    }

    interface StrokeHighlighterArguments {
        padding?: number;
        rx?: number;
        ry?: number;
        attrs?: attributes.NativeSVGAttributes;
    }

    interface HighlighterArgumentsMap {
        'addClass': AddClassHighlighterArguments;
        'opacity': OpacityHighlighterArguments;
        'stroke': StrokeHighlighterArguments;
    }

    type HighlighterType = string & keyof HighlighterArgumentsMap;

    interface GenericHighlighterJSON<K extends HighlighterType> {
        name: K;
        opt?: HighlighterArgumentsMap[K];
    }

    interface GenericHighlighter<K extends HighlighterType> {
        highlight(cellView: dia.CellView, magnetEl: SVGElement, opt?: HighlighterArgumentsMap[K]): void;

        unhighlight(cellView: dia.CellView, magnetEl: SVGElement, opt?: HighlighterArgumentsMap[K]): void;
    }

    type Highlighter = GenericHighlighter<HighlighterType>;

    type HighlighterJSON = GenericHighlighterJSON<HighlighterType>;

    export var addClass: GenericHighlighter<'addClass'>;
    export var opacity: GenericHighlighter<'opacity'>;
    export var stroke: GenericHighlighter<'stroke'>;
}

export namespace attributes {

    interface SVGCoreAttributes {
        'id'?: string;
        'xml:base'?: string;
        'xml:lang'?: string;
        'xml:space'?: string;
        'tabindex'?: number;
    }

    interface SVGConditionalProcessingAttributes {
        'requiredExtensions'?: boolean;
        'requiredFeatures'?: string;
        'systemLanguage'?: string;
    }

    interface SVGXLinkAttributes {
        'xlink:href'?: string;
        'xlink:type'?: string;
        'xlink:role'?: string;
        'xlink:arcrole'?: string;
        'xlink:title'?: string;
        'xlink:show'?: string;
        'xlink:actuate'?: string;
    }

    interface SVGPresentationAttributes {
        'alignment-baseline'?: any;
        'baseline-shift'?: any;
        'clip'?: any;
        'clip-path'?: any;
        'clip-rule'?: any;
        'color'?: any;
        'color-interpolation'?: any;
        'color-interpolation-filters'?: any;
        'color-profile'?: any;
        'color-rendering'?: any;
        'cursor'?: any;
        'direction'?: any;
        'display'?: any;
        'dominant-baseline'?: any;
        'enable-background'?: any;
        'fill'?: any;
        'fill-opacity'?: any;
        'fill-rule'?: any;
        'filter'?: any;
        'flood-color'?: any;
        'flood-opacity'?: any;
        'font-family'?: any;
        'font-size'?: any;
        'font-size-adjust'?: any;
        'font-stretch'?: any;
        'font-style'?: any;
        'font-variant'?: any;
        'font-weight'?: any;
        'glyph-orientation-horizontal'?: any;
        'glyph-orientation-vertical'?: any;
        'image-rendering'?: any;
        'kerning'?: any;
        'letter-spacing'?: any;
        'lighting-color'?: any;
        'marker-end'?: any;
        'marker-mid'?: any;
        'marker-start'?: any;
        'mask'?: any;
        'opacity'?: any;
        'overflow'?: any;
        'pointer-events'?: any;
        'shape-rendering'?: any;
        'stop-color'?: any;
        'stop-opacity'?: any;
        'stroke'?: any;
        'stroke-dasharray'?: any;
        'stroke-dashoffset'?: any;
        'stroke-linecap'?: any;
        'stroke-linejoin'?: any;
        'stroke-miterlimit'?: any;
        'stroke-opacity'?: any;
        'stroke-width'?: any;
        'text-anchor'?: any;
        'text-decoration'?: any;
        'text-rendering'?: any;
        'unicode-bidi'?: any;
        'visibility'?: any;
        'word-spacing'?: any;
        'writing-mode'?: any;
    }

    interface NativeSVGAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGXLinkAttributes {
        'class'?: string;
        'style'?: string;
        'transform'?: string;
        'externalResourcesRequired'?: boolean;

        [key: string]: any;
    }

    interface SVGAttributes extends NativeSVGAttributes {
        // Special attributes
        filter?: string | { [key: string]: any };
        fill?: string | { [key: string]: any };
        stroke?: string | { [key: string]: any };
        sourceMarker?: { [key: string]: any };
        targetMarker?: { [key: string]: any };
        vertexMarker?: { [key: string]: any };
        text?: string;
        textWrap?: { [key: string]: any };
        lineHeight?: number | string;
        textPath?: any;
        annotations?: any;
        port?: string;
        style?: string;
        html?: string;
        ref?: string;
        refX?: string | number;
        refy?: string | number;
        refX2?: string | number;
        refy2?: string | number;
        refDx?: string | number;
        refDy?: string | number;
        refWidth?: string | number;
        refHeight?: string | number;
        refRx?: string | number;
        refRy?: string | number;
        refCx?: string | number;
        refCy?: string | number;
        resetOffset?: boolean;
        xAlignment?: 'middle' | 'right' | number | string;
        yAlignment?: 'middle' | 'bottom' | number | string;
        event?: string;
        magnet?: boolean | string;
        // CamelCase variants of native attributes
        alignmentBaseline?: any;
        baselineShift?: any;
        clipPath?: any;
        clipRule?: any;
        colorInterpolation?: any;
        colorInterpolationFilters?: any;
        colorProfile?: any;
        colorRendering?: any;
        dominantBaseline?: any;
        enableBackground?: any;
        fillOpacity?: any;
        fillRule?: any;
        floodColor?: any;
        floodOpacity?: any;
        fontFamily?: any;
        fontSize?: any;
        fontSizeAdjust?: any;
        fontStretch?: any;
        fontStyle?: any;
        fontVariant?: any;
        fontWeight?: any;
        glyphOrientationHorizontal?: any;
        glyphOrientationVertical?: any;
        imageRendering?: any;
        letterSpacing?: any;
        lightingColor?: any;
        markerEnd?: any;
        markerMid?: any;
        markerStart?: any;
        pointerEvents?: any;
        shapeRendering?: any;
        stopColor?: any;
        stopOpacity?: any;
        strokeDasharray?: any;
        strokeDashoffset?: any;
        strokeLinecap?: any;
        strokeLinejoin?: any;
        strokeMiterlimit?: any;
        strokeOpacity?: any;
        strokeWidth?: any;
        textAnchor?: any;
        textDecoration?: any;
        textRendering?: any;
        unicodeBidi?: any;
        wordSpacing?: any;
        writingMode?: any;
        xlinkHref?: string;
        xlinkShow?: string;
        xlinkType?: string;
        xlinkRole?: string;
        xlinkArcrole?: string;
        xlinkTitle?: string;
        xlinkActuate?: string;
        xmlSpace?: string;
        xmlBase?: string;
        xmlLang?: string;
        // Backwards compatibility
        'ref-x'?: string | number;
        'ref-y'?: string | number;
        'ref-dx'?: string | number;
        'ref-dy'?: string | number;
        'ref-width'?: string | number;
        'ref-height'?: string | number;
        'x-alignment'?: 'middle' | 'right' | number | string;
        'y-alignment'?: 'middle' | 'bottom' | number | string;
    }

    interface SVGTextAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        dx?: string | number;
        dy?: string | number;
        rotate?: string;
        textAnchor?: string;
        textLength?: number;
        lengthAdjust?: string;
        'text-anchor'?: string;
        'text-lenght'?: number;
        'length-adjust'?: string;
    }

    interface SVGRectAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        width?: string | number;
        height?: string | number;
        ry?: string | number;
        rx?: string | number;
    }

    interface SVGCircleAttributes extends SVGAttributes {
        cx?: string | number;
        cy?: string | number;
        r?: string | number;
    }

    interface SVGEllipseAttributes extends SVGAttributes {
        cx?: string | number;
        cy?: string | number;
        rx?: string | number;
        ry?: string | number;
    }

    interface SVGPolygonAttributes extends SVGAttributes {
        points?: string;
    }

    interface SVGPolylineAttributes extends SVGAttributes {
        points?: string;
    }

    interface SVGImageAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        width?: string | number;
        height?: string | number;
        preserveAspectRatio?: string;
    }

    interface SVGPathAttributes extends SVGAttributes {
        d?: string;
        pathLength?: number;
        'path-length'?: number;
    }

}

export function setTheme(theme: string): void;

export namespace ui {

    class Clipboard extends Backbone.Collection<Backbone.Model> {

        constructor(opt?: { useLocalStorage?: boolean });

        /**
         * This function returns the elements and links from the original graph that were copied. This is useful for implements
         * the Cut operation where the original cells should be removed from the graph. `selection` contains
         * elements that should be copied to the clipboard. Note that with these elements, also all the associated
         * links are copied. That's why we also need the `graph` parameter, to find these links.
         */
        copyElements(selection: Backbone.Collection<dia.Cell>, graph: dia.Graph, opt?: { [key: string]: any }): Array<dia.Cell>;

        /**
         * Same logic as per `copyElements`, but elements are removed from the graph
         */
        cutElements(selection: Backbone.Collection<dia.Cell>, graph: dia.Graph, opt?: { [key: string]: any }): Array<dia.Cell>;

        /**
         * If `translate` object with `dx` and `dy` properties is passed, the copied elements will be
         * translated by the specified amount. This is useful for e.g. the 'cut' operation where we'd like to have
         * the pasted elements moved by an offset to see they were pasted to the paper.
         *
         * If `useLocalStorage` is `true`, the copied elements will be saved to the localStorage (if present)
         * making it possible to copy-paste elements between browser tabs or sessions.
         *
         * `link` is attributes that will be set all links before they are added to the `graph`.
         * This is useful for e.g. setting `z: -1` for links in order to always put them to the bottom of the paper.
         */
        pasteCells(graph: dia.Graph, opt?: { [key: string]: any }): Array<dia.Cell>;

        clear(): void;
    }

    class SelectBox extends mvc.View<undefined> {

        constructor(opt?: SelectBox.Option);

        getSelection(): { [key: string]: any };

        getSelectionValue(selection?: SelectBox.Selection): SelectBox.Selection

        getSelectionIndex(): number;

        select(idx: string, opt?: { [key: string]: any }): void;

        selectByValue(value: any, opt?: { [key: string]: any }): void;

        isOpen(): boolean;

        toggle(): void;

        open(): void;

        close(): void;

        isDisabled(): boolean;

        enable(): void;

        disable(): void;

        render(): this;

        static OptionsView: any

        protected onToggle(evt: JQuery.Event): void;

        protected onOutsideClick(evt: JQuery.Event): void;

        protected onOptionsMouseOut(evt: JQuery.Event): void;

        protected onOptionSelect(idx: string, opt?: { [key: string]: any }): void;

        protected onOptionHover(option?: { [key: string]: any }, idx?: string): void;

        protected position(): void;

        protected calculateElOverflow(el: HTMLElement, target: any): number;
    }

    namespace SelectBox {

        export interface Selection {
            [key: string]: any;
        }

        export interface Option extends mvc.ViewOptions<undefined> {
            icon?: string;
            content?: JQuery | string | HTMLElement;
            options?: Array<{ [key: string]: any }>;
            target?: JQuery | string | HTMLElement;
            width?: number;
            openPolicy?: 'selected' | 'auto' | 'above' | 'coverAbove' | 'below' | 'coverBelow';
            selectBoxOptionsClass?: string | (() => string);
            placeholder?: string;
            disabled?: boolean;
            keyboardNavigation?: boolean
        }
    }

    class ColorPalette extends ui.SelectBox {

        protected position(): void;

        static OptionsView: any;
    }

    namespace ContextToolbar {

        export interface Options extends mvc.ViewOptions<undefined> {
            padding?: number;
            autoClose?: boolean;
            type?: string;
            tools?: { [key: string]: any };
            root?: HTMLElement;
            target?: string | JQuery | HTMLElement;
        }
    }

    class ContextToolbar extends mvc.View<undefined> {

        constructor(opt?: ContextToolbar.Options)

        bind(): void;

        unbind(): this

        render(): this;

        static opened: ContextToolbar | undefined;

        static close(): void;

        // Call whenever the `options.target` changes its position.
        static update(): void;

        protected position(): void;

        protected onToolPointerdown(evt: JQuery.Event): void ;

        protected onDocumentMousedown(evt: JQuery.Event): void;

        protected renderContent(): void;
    }

    namespace Dialog {

        export interface Options extends mvc.ViewOptions<undefined> {
            draggable?: boolean;
            closeButtonContent?: string | HTMLElement | JQuery;
            closeButton?: boolean;
            inlined?: boolean;
            modal?: boolean;
        }
    }

    class Dialog extends mvc.View<undefined> {

        constructor(options: Dialog.Options);

        close(): this;

        render(): this;

        protected action(evt: JQuery.Event): void;

        protected onDragStart(evt: JQuery.Event): void;

        protected onDrag(evt: JQuery.Event): void;

        protected onDragEnd(): void;
    }

    class FlashMessage extends ui.Dialog {

        constructor(options?: {
            closeButton?: boolean,
            modal?: boolean,
            cascade?: boolean,
            closeAnimation?: {
                delay?: number,
                duration?: number,
                easing?: string,
                properties?: {
                    opacity?: number
                }
            },
            openAnimation?: {
                duration?: number,
                easing?: string,
                properties?: {
                    opacity?: number
                }
            }
        })

        protected addToCascade(): void;

        protected removeFromCascade(): void;

        protected startCloseAnimation(): void;

        protected startOpenAnimationk(): void;

        static padding: 15;

        static open(content: any, title: any, opt?: { [key: string]: any }): void;

        static close(): void;

        open(): this;

        close(): this;
    }

    namespace FreeTransform {

        export interface Options extends mvc.ViewOptions<undefined> {
            cellView?: dia.CellView;
            rotateAngleGrid?: number;
            preserveAspectRatio?: boolean;
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
            allowOrthogonalResize?: boolean;
            allowRotation?: boolean;
            clearAll?: boolean;
            clearOnBlankPointerdown?: boolean;
        }
    }

    class FreeTransform extends mvc.View<undefined> {

        constructor(options?: FreeTransform.Options);

        update(): void;

        render(): this;

        static clear(paper: dia.Paper): void;

        protected startResizing(evt: JQuery.Event): void;

        protected toValidResizeDirection(direction: string): any

        protected startRotating(evt: JQuery.Event): void;

        protected pointermove(evt: JQuery.Event): void;

        protected pointerup(evt: JQuery.Event): void;

        protected startOp(el: string | JQuery | HTMLElement): void;

        protected stopOp(): void;

        protected renderHandles(): void;
    }

    namespace Inspector {

        interface Options extends mvc.ViewOptions<undefined> {
            cellView?: dia.CellView;
            cell?: dia.Cell;
            live?: boolean;
            validateInput?: (input: any, path: string, type: string) => boolean;
            groups?: any;
            inputs?: any;
            storeGroupsState?: boolean;
            restoreGroupsState?: boolean;
            renderFieldContent?: (opt: { [key: string]: any }, path: string, value: any) => string | JQuery | HTMLElement;
            getFieldValue?: (attribute: HTMLElement, type: string) => any;
            multiOpenGroups?: boolean;
            stateKey?: (model: dia.Cell) => string;
            operators?: { [key: string]: (cell: dia.Cell, value: any, prop: any) => boolean };
        }
    }

    class Inspector extends mvc.View<undefined> {

        constructor(options: Inspector.Options);

        render(): this;

        updateCell($attr?: JQuery, attrPath?: string, opt?: { [key: string]: any }): void;

        toggleGroup(name: string): void;

        closeGroup(name: string, opt?: { [key: string]: any }): void;

        openGroup(name: string, opt?: { [key: string]: any }): void;

        closeGroups(): void;

        openGroups(): void;

        storeGroupsState(): void;

        restoreGroupsState(): void;

        static create(container: HTMLElement | string | JQuery, opt?: Inspector.Options): ui.Inspector;

        static close(): void;

        protected renderGroup(opt?: { [key: string]: any }): JQuery;

        protected renderOwnFieldContent(opt?: { [key: string]: any }): JQuery;

        protected replaceHTMLEntity(entity: any, code: any): void;

        protected renderObjectProperty(opt?: { [key: string]: any }): JQuery;

        protected renderListItem(opt?: { [key: string]: any }): JQuery;

        protected renderFieldContainer(opt?: { [key: string]: any }): JQuery;

        protected renderTemplate($el: JQuery, options: { [key: string]: any }, path: string, opt?: { [key: string]: any }): void;

        protected addListItem(evt: JQuery.Event): void;

        protected deleteListItem(evt: JQuery.Event): void;

        protected onChangeInput(evt: JQuery.Event): void;

        protected processInput($input: JQuery, opt: { [key: string]: any }): void;

        protected onCellChange(eventName: string, cell: dia.Cell, change: any, opt: { [key: string]: any }): void;

        protected pointerdown(evt: JQuery.Event): void;

        protected pointerup(): void;

        protected pointerfocusin(evt: JQuery.Event): void;

        protected pointerfocusout(evt: JQuery.Event): void;

        protected onGroupLabelClick(evt: JQuery.Event): void;

        protected renderFieldContent(options: { [key: string]: any }, path: string, value: any): HTMLElement;

        protected onContentEditableBlur(evt: JQuery.Event): void;
    }

    namespace PaperScroller {

        export interface Options {
            paper: dia.Paper;
            padding?: dia.Padding | (() => dia.Padding);
            minVisiblePaperSize?: number;
            autoResizePaper?: boolean;
            baseWidth?: number;
            baseHeight?: number;
            contentOptions?: {
                padding?: dia.Padding | (() => dia.Padding),
                gridWidth?: number,
                gridHeight?: number,
                minHeight?: number,
                minWidth?: number,
                allowNewOrigin?: string
            },
            cursor?: string;
        }
    }

    class PaperScroller extends mvc.View<undefined> {

        transitionClassName: string;

        transitionEventName: string;

        constructor(opt?: PaperScroller.Options);

        lock(): this;

        unlock(): this;

        render(): this;

        setCursor(cursor: string): this;

        clientToLocalPoint(x: number, y: number): g.Point;

        localToBackgroundPoint(x: number, y: number): g.Point;

        center(x?: number, y?: number, opt?: { [key: string]: any }): this;

        centerContent(opt?: number): this;

        centerElement(element: dia.Element): this;

        scroll(x: number, y: number, opt?: { [key: string]: any }): void;

        scrollToElement(element: dia.Element, opt?: { [key: string]: any }): void;

        addPadding(left: number, right: number, top: number, bottom: number): this;

        zoom(value: number, opt?: { [key: string]: any }): this;

        zoomToFit(opt?: dia.Paper.ScaleContentOptions): this;

        transitionToPoint(x: number, y: number, opt?: { [key: string]: any }): this;

        removeTransition(): this;

        transitionToRect(rect: g.Rect, opt?: { [key: string]: any }): g.Point;

        startPanning(evt: JQuery.Event): void;

        stopPanning(evt: JQuery.Event): void;

        getVisibleArea(): g.Rect;

        isElementVisible(element: dia.Element, opt?: { [key: string]: any }): boolean;

        isPointVisible(point: dia.Point): boolean;

        protected onBackgroundEvent(evt: JQuery.Event): void;

        protected onResize(): void;

        protected onScale(sx: number, sy: number, ox: number, oy: number): void;

        protected beforePaperManipulation(): void;

        protected afterPaperManipulation(): void;
    }

    namespace Lightbox {

        export type Easing = string;

        export interface Options {
            image: string;
            closeButton?: boolean;
            modal?: boolean;
            closeAnimation?: {
                delay?: number;
                duration?: number;
                easing?: Easing;
                properties?: {
                    opacity?: number
                }
            };
            title?: string;
            top?: number;
            windowArea?: number;
            openAnimation?: boolean
        }
    }

    class Lightbox extends ui.Dialog {

        constructor(options?: Lightbox.Options)

        open(): this;

        positionAndScale(): void;

        close(): this;

        startCloseAnimation(): void;

        startOpenAnimation(): void;
    }

    class Popup extends ContextToolbar {

        renderContent(): void;
    }

    namespace PathDrawer {

        export interface Options extends mvc.ViewOptions<undefined> {
            target: SVGSVGElement,
            pathAttributes?: attributes.NativeSVGAttributes,
            startPointMarkup?: string
        }
    }

    class PathDrawer extends mvc.View<undefined> {

        constructor(options?: PathDrawer.Options);

        render(): this;

        remove(): this;

        onStartPointPointerDown(evt: JQuery.Event): void;

        onPointerDown(evt: JQuery.Event): void;

        onDoubleClick(evt: JQuery.Event): void;

        onContextMenu(evt: JQuery.Event): void;
    }

    namespace PathEditor {

        export interface Options extends mvc.ViewOptions<undefined> {
            pathElement: SVGPathElement,
            anchorPointMarkup?: string,
            controlPointMarkup?: string
        }
    }

    class PathEditor extends mvc.View<undefined> {

        constructor(options?: PathEditor.Options);

        render(): this;

        remove(): this;

        adjustAnchorPoint(index: number, dx: number, dy: number): void;

        adjustControlPoint(index: number, controlPointIndex: number, dx: number, dy: number): void;

        onAnchorPointPointerDown(evt: JQuery.Event): void;

        onControlPointPointerDown(evt: JQuery.Event): void;

        onSegmentPathPointerDown(evt: JQuery.Event): void;

        onAnchorPointDoubleClick(evt: JQuery.Event): void;

        onControlPointDoubleClick(evt: JQuery.Event): void;

        onSegmentPathDoubleClick(evt: JQuery.Event): void;

        addClosePathSegment(evt: JQuery.Event): void;

        removeClosePathSegment(evt: JQuery.Event): void;

        convertSegmentPath(evt: JQuery.Event): void;
    }

    namespace Navigator {

        export interface Options extends mvc.ViewOptions<undefined> {
            paperConstructor?: dia.Paper;
            paperOptions?: dia.Paper.Options;
            paperScroller?: PaperScroller;
            zoomOptions?: { min?: number, max?: number };
            zoom?: { min?: number, max?: number } | boolean;
            width?: number;
            height?: number;
            padding?: number;
        }
    }

    class Navigator extends mvc.View<undefined> {

        constructor(options?: Navigator.Options);

        render(): this;
    }

    namespace SelectButtonGroup {

        export interface Options extends mvc.ViewOptions<undefined> {
            buttonWidth?: number;
            buttonHeight?: number;
            iconWidth?: number;
            iconHeight?: number;
            options?: Array<{
                value?: any,
                content?: string | HTMLElement | JQuery,
                icon?: string,
                iconSelected?: string,
                selected?: boolean,
                buttonWidth?: number,
                buttonHeight?: number,
                iconWidth?: number,
                iconHeight?: number,
            }>;
            disabled?: boolean;
            multi?: boolean;
            selected?: any;
        }
    }

    class SelectButtonGroup extends mvc.View<undefined> {

        constructor(options?: SelectButtonGroup.Options);

        getSelection(): any;

        getSelectionValue(selection: any): any;

        select(index: number, opt?: { [key: string]: any }): void;

        selectByValue(value: any, opt?: { [key: string]: any }): void;

        deselect(): void;

        isDisabled(): boolean;

        enable(): void;

        disable(): void;

        render(): this;

        protected onSelect(evt: JQuery.Event): void;

        protected onOptionHover(evt: JQuery.Event): void;

        protected onMouseOut(evt: JQuery.Event): void;

        protected pointerdown(evt: JQuery.Event): void;

        protected pointerup(): void;
    }

    class Widget extends mvc.View<undefined> {

        constructor(opt: mvc.ViewOptions<undefined>, refs?: Array<any>);

        protected getReferences(): Array<any>;

        protected getReference(name: string): any;

        static create<T extends Widget>(opt: { [key: string]: any } | string, refs?: Array<any>): T;
    }

    namespace Toolbar {

        export interface Options extends mvc.ViewOptions<undefined> {
            tools?: Array<{ [key: string]: any }>,
            groups?: {
                [key: string]: {
                    index?: number,
                    align?: Align
                }
            }
            references?: any
        }

        const enum Align {
            Left = 'left',
            Right = 'right'
        }
    }

    class Toolbar extends mvc.View<undefined> {

        constructor(options?: Toolbar.Options);

        on(evt: string | object, callback?: (evt: JQuery.Event) => void, context?: any): this;

        getWidgetByName<T extends Widget>(name: string): T;

        getWidgets(): Array<Widget>;

        render(): this;
    }

    class Tooltip extends mvc.View<undefined> {

        constructor(options?: Tooltip.Options);

        hide(): void;

        show(evt?: JQuery.Event): void;

        toggle(evt?: JQuery.Event): void;

        isVisible(): boolean;

        render(): this;

        protected getTooltipSettings(el: HTMLElement): { [key: string ]: any };
    }

    namespace Tooltip {

        export enum TooltipPosition {
            Left = 'left',
            Top = 'top',
            Bottom = 'bottom',
            Right = 'right'
        }

        const enum TooltipArrowPosition {
            Left = 'left',
            Top = 'top',
            Bottom = 'bottom',
            Right = 'right',
            Auto = 'auto',
            Off = 'off'
        }

        export interface Options extends mvc.ViewOptions<undefined> {

            position?: TooltipPosition | ((element: Element) => TooltipPosition);
            positionSelector?: string | ((element: Element) => Element);
            direction?: TooltipArrowPosition;
            minResizedWidth?: number;
            padding?: number;
            rootTarget?: any;
            target?: any;
            trigger?: string;
            viewport?: {
                selector?: null
                padding?: number
            };
            dataAttributePrefix?: string;
            template?: string;
        }
    }

    class Keyboard {

        constructor();

        on(evt: string | object, callback?: ((evt: JQuery.Event) => void) | any, context?: any): this;

        off(evt: string | object, callback?: ((evt: JQuery.Event) => void) | any, context?: any): this;

        enable(): void;

        disable(): void;

        isActive(name: string, evt: JQuery.Event): boolean;
    }

    class Selection extends mvc.View<dia.Cell> {

        constructor(options?: Selection.Options);

        cancelSelection(): void;

        addHandle(opt?: Selection.Handle): this;

        stopSelecting(evt: JQuery.Event): void;

        removeHandle(name: string): this;

        startSelecting(evt: JQuery.Event): void;

        changeHandle(name: string, opt?: Selection.Handle): this;

        translateSelectedElements(dx: number, dy: number): void;

        hide(): void;

        render(): this;

        protected onSelectionBoxPointerDown(evt: JQuery.Event): void;

        protected startTranslatingSelection(evt: JQuery.Event): void;

        protected pointerup(evt: JQuery.Event): void;

        protected destroySelectioaBox(elememet: dia.Element): void;

        protected showSelected(): void;

        protected destroyAllSelectionBoxes(): void;

        protected createSelectionBox(element: Element): void;

        protected onHandlePointerDown(evt: JQuery.Event): void;

        protected pointermove(evt: JQuery.Event): void;

        protected onRemoveElement(element: dia.Element): void;

        protected onResetElements(elements: dia.Element): void;

        protected onAddElement(element: dia.Element): void;
    }

    namespace Selection {

        export interface Options extends mvc.ViewOptions<undefined> {
            paper: dia.Paper;
            graph?: dia.Graph;
            boxContent?: string | HTMLElement | JQuery | ((boxElement: JQuery) => string | HTMLElement | JQuery);
            handles?: Array<Handle>;
            useModelGeometry?: boolean;
            strictSelection?: boolean;
            rotateAngleGrid?: number;
            allowTranslate?: boolean;
            collection?: any;
        }

        export interface Handle {
            name: string;
            position?: HandlePosition;
            events?: HandleEvents;
            attrs?: any;
            icon?: string;
            content?: string | HTMLElement | JQuery
        }

        const enum HandlePosition {
            N = 'n', NW = 'nw',
            W = 'w', SW = 'sw',
            S = 's', SE = 'se',
            E = 'e', NE = 'ne'
        }

        export interface HandleEvents {
            pointerdown?: string | ((evt: JQuery.Event) => void);
            pointermove?: string | ((evt: JQuery.Event) => void);
            pointerup?: string | ((evt: JQuery.Event) => void);
        }
    }

    namespace Snaplines {

        export interface Options extends mvc.ViewOptions<undefined> {
            paper: dia.Paper;
            distance?: number;
            filter?: string[] | dia.Cell[] | (() => string[] | dia.Cell[]);
        }
    }

    class Snaplines extends mvc.View<undefined> {

        constructor(opt?: Snaplines.Options);

        startListening(): void;

        hide(): void;

        render(): this;

        protected show(opt?: {
            vertical?: number,
            horizontal?: number
        }): void;

        protected captureCursorOffset(cellView: dia.CellView, evt: JQuery.Event, x: number, y: number): void;

        protected snapWhileResizing(cell: dia.Cell, opt?: { [key: string]: any }): void;

        protected canElementMove(cellView: dia.CellView): boolean;

        protected snapWhileMoving(cellView: dia.CellView, evt: JQuery.Event, x: number, y: number): void;

        protected onBatchStop(data: { [key: string]: any }): void;
    }

    namespace Stencil {

        export interface Options extends mvc.ViewOptions<undefined> {
            paper: dia.Paper | ui.PaperScroller,
            width?: number;
            height?: number;
            label?: string;
            groups?: {
                groups?: { [key: string]: Stencil.Group },
                shapes?: { [key: string]: any }
            };
            groupsToggleButtons?: boolean;
            dropAnimation?: boolean;
            search?: { [key: string]: any };
            layout?: boolean | layout.GridLayout.Options | { [key: string]: any };
            snaplines?: ui.Snaplines;
            scaleClones?: boolean;
            dragStartClone?: (cell: dia.Cell) => dia.Cell;
            dragEndClone?: (cell: dia.Cell) => dia.Cell;
            layoutGroup?: (graph: dia.Graph, group: Group) => void;
            paperOptions?: dia.Paper.Options;
        }

        export interface Group {
            label: string;
            index: number;
            closed?: boolean;
            height?: number;
            layout?: boolean | layout.GridLayout.Options | { [key: string]: any };
        }
    }

    class Stencil extends mvc.View<undefined> {

        constructor(opt?: Stencil.Options);

        options: Stencil.Options;

        setPaper(paper: dia.Paper): void;

        startListening(): void;

        load(cells: dia.Element[] | { [key: string]: any }, group?: Stencil.Group): void;

        loadGroup(cells: dia.Element[], group: Stencil.Group): void;

        getGraph(group: string): dia.Graph;

        getPaper(group: string): dia.Paper;

        render(): this;

        toggleGroup(name: string): void;

        closeGroup(name: string): void;

        openGroup(name: string): void;

        isGroupOpen(name: string): boolean;

        closeGroups(): void;

        openGroups(): void;

        protected preparePaperForDragging(cellView: dia.CellView, clientX: number, clientY: number): void;

        protected onCloneSnapped(clone: dia.Cell, position: any, opt?: { [key: string]: any }): void;

        protected onDrag(evt: JQuery.Event): void;

        protected onDragEnd(evt: JQuery.Event): void;

        protected onDropEnd(cellClone: dia.Cell): void;

        protected onDropInvalid(evt: JQuery.Event, cellClone: dia.Cell): void;

        protected onSearch(evt: JQuery.Event): void;

        protected pointerFocusIn(): void;

        protected pointerFocusOut(): void;

        protected onGroupLabelClick(evt: JQuery.Event): void;
    }

    class TreeLayoutView extends mvc.View<undefined> {

        constructor(options?: { [key: string]: any });

        startListening(): void;

        toggleDefaultInteraction(interactive: boolean): void;

        toggleDropping(state: boolean): void;

        canDrop(): boolean;

        isActive(): boolean;

        // Interaction
        canInteract(handler: any): boolean;

        startDragging(elements: Array<dia.Element>): void;

        render(): this;

        protected onPointerdown(elementView: dia.ElementView): void;

        protected onPointermove(evt: JQuery.Event): void;

        protected onPointerup(evt: JQuery.Event): void;
    }

    namespace Halo {

        export interface Options extends mvc.ViewOptions<undefined> {
            cellView: dia.CellView;
            loopLinkPreferredSide?: 'top' | 'bottom' | 'left' | 'right';
            loopLinkWidth?: number;
            rotateAngleGrid?: number;
            boxContent?: string | HTMLElement | JQuery | ((boxElement: JQuery) => string | HTMLElement | JQuery);
            handles?: Array<Handle>;
            clearAll?: boolean;
            clearOnBlankPointerdown?: boolean;
            useModelGeometry?: boolean;
            clone?: (cell: dia.Cell, opt: { [key: string]: any }) => dia.Cell;
            type?: string;
            pieSliceAngle?: number;
            pieStartAngleOffset?: number;
            pieIconSize?: number;
            pieToggles?: Array<{ name: string, position: HandlePosition }>;
            bbox?: dia.Point | dia.BBox | ((cellView: dia.CellView) => dia.Point | dia.BBox);
            magnet?: (elementView: dia.ElementView, end: 'source' | 'target') => SVGElement;
        }

        const enum HandlePosition {
            N = 'n', NW = 'nw',
            W = 'w', SW = 'sw',
            S = 's', SE = 'se',
            E = 'e', NE = 'ne'
        }

        interface HandleEvents {
            pointerdown?: string | ((evt: JQuery.Event) => void);
            pointermove?: string | ((evt: JQuery.Event) => void);
            pointerup?: string | ((evt: JQuery.Event) => void);
        }

        interface Handle {
            name: string,
            position?: HandlePosition,
            events?: HandleEvents
            attrs?: any
        }
    }

    class Halo extends mvc.View<undefined> {

        constructor(options?: Halo.Options);

        extendHandles(props: Halo.Handle): void;

        addHandles(handles: Halo.Handle[]): this;

        addHandle(handle: Halo.Handle): this;

        removeHandles(): this;

        removeHandle(name: string): this;

        changeHandle(name: string, handle: Halo.Handle): this;

        hasHandle(name: string): boolean;

        getHandle(name: string): Halo.Handle | undefined;

        toggleHandle(name: string, selected?: boolean): this;

        selectHandle(name: string): this;

        deselectHandle(name: string): this;

        deselectAllHandles(): this;

        toggleState(toggleName: string): void;

        isOpen(toggleName: string): boolean;

        isRendered(): boolean;

        render(): this;

        static clear(paper: dia.Paper): void;

        protected update(): void;

        protected onHandlePointerDown(evt: JQuery.Event): void;

        protected onPieTogglePointerDown(evt: JQuery.Event): void;

        protected pointermove(evt: JQuery.Event): void;

        protected pointerup(evt: JQuery.Event): void;
    }
}

export namespace dia {

    export namespace Paper {

        interface PrintExportOptions {
            size?: string;
            padding?: dia.Padding;
        }

        interface RasterExportOptions {
            type?: 'image/png' | 'image/jpeg' | string;
            height?: number;
            width?: number;
            size?: string;
            backgroundColor?: string;
            quality?: number;
            padding?: dia.Padding;
            area?: dia.BBox;
            useComputedStyle?: boolean;
            stylesheet?: string;
        }

        interface SVGExportOptions {
            preserveDimensions?: boolean;
            area?: dia.BBox;
            convertImagesToDataUris?: boolean;
            useComputedStyles?: boolean;
            stylesheet?: string;
        }
    }

    export interface Paper {

        print(opt?: Paper.PrintExportOptions): void;

        toDataURL(callback: (dataURL: string) => void, opt?: Paper.RasterExportOptions): void;

        toJPEG(callback: (dataURL: string) => void, opt?: Paper.RasterExportOptions): void;

        toPNG(callback: (dataURL: string) => void, opt?: Paper.RasterExportOptions): void;

        toSVG(callback: (svg: string) => void, opt?: Paper.SVGExportOptions): void;

        openAsSVG(opt?: Paper.SVGExportOptions): void;

        openAsPNG(opt?: Paper.RasterExportOptions): void;
    }

    namespace CommandManager {

        export interface Options {
            graph: dia.Graph;
            cmdBeforeAdd?: (eventName: string, ...eventArgs: any[]) => boolean;
            cmdNameRegex?: any; /* a regular expression */
            applyOptionsList?: string[];
            revertOptionsList?: string[];
        }
    }

    class CommandManager extends Backbone.Model {

        constructor(opt: CommandManager.Options);

        undo(opt?: { [key: string]: any }): void;

        redo(opt?: { [key: string]: any }): void;

        cancel(opt: { [key: string]: any }): void;

        hasUndo(): boolean;

        hasRedo(): boolean;

        listen(): void;

        initBatchCommand(): void;

        storeBatchCommand(): void;
    }

    namespace Validator {

        export interface Options {
            commandManager: dia.CommandManager;
            cancelInvalid?: boolean;
        }
    }

    class Validator extends Backbone.Model {

        constructor(opt: Validator.Options);

        validate(...actions: Array<(err: Error, command: any, next: any) => boolean>): Validator;
    }
}

export namespace alg {

    interface PriorityQueueOptions {
        comparator?: (a: number, b: number) => number;
        data: Array<any>
    }

    class PriorityQueue {

        constructor(opt: PriorityQueueOptions)

        isEmpty(): boolean;

        insert(priority: number, value: any, id?: number | string): void;

        peek(): any;

        peekPriority(): number;

        updatePriority(id: number | string, priority: number): void;

        remove(): any;

        bubbleUp(pos: number): void;

        bubbleDown(pos: number): void;
    }

    const Dijkstra: (adjacencyList: any, source: string | number, weight: (aNode: any, bNode: any) => number) => any;
}

export namespace com {

    namespace Channel {
        export interface Options {
            url?: string;
            port: any;
            serverShouldSendGraph: boolean;
            reconnectInterval: number;
            ttl: number;
            query: { [key: string]: any };
            debugLevel: number;
            id: string;
            graph: dia.Graph;
        }

    }

    class Channel extends Backbone.Events {

        constructor(opt: Channel.Options);

        close(): void;

        healthCheck(): void;

        broadcast(message:  { [key: string]: any }): void;

        send(): void;

        pause(): void;

        unpause(): void;

        onConnection(socket: any): void;

        protected initialize(): void;

        protected onClose(socket: any): void;

        protected onMessage(socket: any, message: string): void;

        protected onGraphChange(eventName: string, cell: dia.Cell, graph: dia.Graph, opt?: { [key: string]: any }): void;
    }

    class ChannelHub {

        constructor(opt: { port: number });

        route(): void;

        close(): void;

        protected initialize(): void;

        protected onConnection(socket: any): void;
    }
}

export namespace format {

    namespace getfx {
        export interface ElementOptions {
            id: string | number;
            width: number;
            height: number;
            label: string;
        }

        export interface LinkOptions {
            id: string | number;
            width: number;
            height: number;
            label: string;
        }
    }

    const gexf: (xmlString: string, makeElement: (opt: getfx.ElementOptions) => dia.Element, makeLink: (opt: getfx.LinkOptions) => dia.Link) => Array<dia.Cell>;

}

export namespace layout {

    namespace ForceDirected {
        export interface Options {
            graph: dia.Graph;
            width: number;
            height: number;
            gravityCenter: dia.Point;
            charge?: number;
            linkDistance?: number;
            linkStrength?: number;

        }
    }

    class ForceDirected extends Backbone.Model {

        constructor(opt: ForceDirected.Options);

        start(): void;

        step(): void;
    }

    namespace GridLayout {

        export interface Options {
            centre?: boolean;
            dx?: number;
            dy?: number;
            resizeToFit?: boolean;
            marginX?: number;
            marginY?: number;
            columns?: number;
            columnWidth?: 'compact' | 'auto' | number | string;
            rowHeight?: 'compact' | 'auto' | number | string;
            deep?: boolean;
            parentRelative?: boolean;
        }

        export function layout(graphOrCells: dia.Graph | Array<dia.Cell>, opt?: Options): void;
    }

    namespace TreeLayout {

        interface AttributeNames {
            'siblingRank'?: string;
            'direction'?: string;
            'margin'?: string;
            'offset'?: string;
            'prevSiblingGap'?: string;
            'nextSiblingGap'?: string;
            'firstChildGap'?: string;
        }

        type Direction = 'L' | 'R' | 'T' | 'B' | 'BR' | 'BL' | 'TR' | 'TL';

        type DirectionRule = (rule: [Direction, Direction]) => (direction: Direction) => Direction;

        export interface DirectionRules {
            rotate: DirectionRule;
            flip: DirectionRule;
            straighten: DirectionRule;
        }

        export interface Options {
            graph: dia.Graph;
            gap?: number;
            parentGap?: number;
            siblingGap?: number;
            firstChildGap?: number;
            direction?: Direction;
            directionRule?: DirectionRule;
            updatePosition?: null | ((element: dia.Element, position: dia.Point, opt?: { [key: string]: any }) => void);
            updateVertices?: null | ((link: dia.Link, vertices: Array<dia.Point>, opt?: { [key: string]: any }) => void);
            updateAttributes?: null | ((layoutArea: any, root: dia.Element, rootLink: dia.Link, opt: { [key: string]: any }) => void);
            filter?: null | ((children: dia.Element[], parent: dia.Element | null, opt: { [key: string]: any }) => dia.Element[]);
            attributeNames?: AttributeNames;
        }
    }

    class TreeLayout extends Backbone.Model {

        constructor(opt: TreeLayout.Options);

        layout(opt?: { [key: string]: any }): this;

        layoutTree(root: dia.Element, opt?: { [key: string]: any }): this;

        static directionRules: TreeLayout.DirectionRules
    }
}

export namespace storage {
    const Local: {
        prefix: string;
        insert: (collection: string, doc: any, callback: (err: Error, doc: any) => void) => void;
        find: (collection: string, query: any, callback: (err: Error, docs: Array<any>) => void) => void;
        remove: (collection: string, query: any, callback: (err: Error) => void) => void;
    };
}
