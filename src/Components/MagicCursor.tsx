import { stat } from "fs";
import { createContext, createRef, useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface MagicCursorState {
    following: boolean;
    followingClassName: string;
    followingStyle: React.CSSProperties;
    lockClassName?: string;
    lockStyle?: React.CSSProperties;
    lockAt?: { x: number, y: number };
}

export const DefaultState: MagicCursorState = {
    following: true,
    followingClassName: "w-5 h-5 rounded-full backdrop-invert z-50",
    followingStyle: {},
};

export const MagicCursorContext = createContext({
    state: DefaultState,
    setState: (state: MagicCursorState) => { },
});

export function MagicCursorProvider(
    props: {
        children: React.ReactNode;
        value: MagicCursorState;
    }

) {
    const handleSetState = (newState: MagicCursorState) => {
        setState({
            state: newState,
            setState: state.setState,
        });
    };

    const [state, setState] = useState({
        state: props.value,
        setState: handleSetState,
    });

    return (
        <MagicCursorContext.Provider value={state}>
            {props.children}
            <MagicCursor />
        </MagicCursorContext.Provider>
    );
}

function useMouse() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return position;

}

function sMerge(...styles: (React.CSSProperties | undefined)[]) {
    return styles.reduce((merged, current) => {
        if (!current) {
            return merged;
        }
        return {
            ...merged,
            ...current,
            transform: merged?.transform ? `${merged.transform} ${current.transform}` : current.transform
        };
    }, {});
}

export function MagicCursor() {
    const state = useContext(MagicCursorContext).state;
    const mouse = useMouse();
    const [removeTransition, setRemoveTransition] = useState(false);

    const className = twMerge(
        "fixed -translate-x-1/2 -translate-y-1/2 transition-transform duration-150",
        state.following ? state.followingClassName : state.lockClassName,
        "pointer-events-none",
        removeTransition ? "transition-none" : undefined
    );

    const style = sMerge(
        (state.following ?
            sMerge(
                state.followingStyle,
                {
                    left: mouse.x,
                    top: mouse.y,
                }
            ) :
            sMerge(
                state.lockStyle,
                state.lockAt ? {
                    left: state.lockAt.x,
                    top: state.lockAt.y,
                } : {}
            ))
    );
    useEffect(() => {
        if (state.following) {
            setTimeout(() => {
                setRemoveTransition(true);
            }, 150);
        }
        else {
            setRemoveTransition(false);
        }
    }, [state.following]);

    return (
        <div className={className}
            style={style}
            aria-disabled
        >

        </div>
    );
}


export interface CursorLockProps {
    lockClassName?: string;
    lockStyle?: React.CSSProperties;
    noLock?: boolean;
    holdLock?: boolean;
};

export function CursorLock({
    as: Tag = "div",
    ...rest
}: {
    as?: React.ElementType;
} & CursorLockProps & React.HTMLAttributes<HTMLElement>) {
    const state = useContext(MagicCursorContext);
    const ref = createRef<HTMLElement>();

    const {
        lockClassName,
        lockStyle,
        noLock,
        holdLock,
        ...props
    } = rest;
    const handleEnter = () => {
        if (!noLock) {
            state.setState({
                ...state.state,
                following: false,
                lockClassName: lockClassName || state.state.lockClassName,
                lockStyle: sMerge(lockStyle, state.state.lockStyle),
                lockAt: {
                    x: (ref.current?.offsetLeft || 0) + (ref.current?.offsetWidth || 0) / 2 || 0,
                    y: (ref.current?.offsetTop || 0) + (ref.current?.offsetHeight || 0) / 2 || 0,
                }
            });
        }
        props.onMouseEnter = handleEnter;
    };

    const handleLeave = () => {
        if (!holdLock) {
            state.setState({
                ...state.state,
                following: true,
                lockClassName: undefined,
                lockStyle: undefined,
            });
        }
        props.onMouseLeave = handleLeave;
    };

    return (
        <Tag
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            ref={ref}
            {...props}
        >
            {props.children}
        </Tag>
    );
}


