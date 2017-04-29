// @flow

export type Element<Config> = React$Element<Config>;

export type AnyReactElement = ?Element<any>;

export type ReactChildren = AnyReactElement | Array<AnyReactElement> | string | number;

export type FunctionalComponent<Props> = (props: Props) => ?Element<any>;

export type ClassComponent<DefaultProps, Props, State> = Class<React$Component<DefaultProps, Props, State>>;

export type Component<Props> = FunctionalComponent<Props> | ClassComponent<any, Props, any>;
