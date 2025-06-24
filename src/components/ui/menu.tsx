import * as React from "react"
import { Menu as BaseMenu } from "@base-ui-components/react/menu"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "~/utils/cn"

const Menu = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return <div {...props}></div>
}


interface MenuContentProps
	extends React.ComponentProps<typeof BaseMenu.Popup> {
	align?: BaseMenu.Positioner.Props["align"]
	sideOffset?: BaseMenu.Positioner.Props["sideOffset"]
    showArrow?: boolean
}

const MenuContent = ({ className, align = "center", showArrow, sideOffset = 4, ref, ...props } : MenuContentProps) => {
    return(
		<BaseMenu.Portal>
			<BaseMenu.Positioner sideOffset={sideOffset} align={align}>
                {showArrow && <ArrowSvg />}
				<BaseMenu.Popup
					ref={ref}
					className={cn(
						"min-w-48 origin-[var(--transform-origin)] rounded-md border bg-popover p-1 text-popover-foreground shadow-sm outline-none transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none",
						className
					)}
					{...props}
				/>
			</BaseMenu.Positioner>
		</BaseMenu.Portal>
    )
}

const MenuItem = ({ className, ref, ...props } : React.ComponentProps<typeof BaseMenu.Item>) => {
    return (
        <BaseMenu.Item
            ref={ref}
            className={cn(
                "flex select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                className
            )}
            {...props}
        />
    )
}

const MenuSeparator = ({ className, ref, ...props } : React.ComponentProps<typeof BaseMenu.Separator>) => {
    return (
        <BaseMenu.Separator
            ref={ref}
            className={cn("bg-border -mx-1 my-1 h-px", className)}
            {...props}
        />
    )
}

const MenuGroupLabel = ({ className, ref, ...props } : React.ComponentProps<typeof BaseMenu.GroupLabel>) => {
    return (
        <BaseMenu.GroupLabel
            ref={ref}
            className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
            {...props}
        />
    )
}

const MenuCheckboxItem = ({ className, children, ref, ...props } : React.ComponentProps<typeof BaseMenu.CheckboxItem>) => {
    return (
        <BaseMenu.CheckboxItem
            ref={ref}
            className={cn(
                "flex select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
                className
            )}
            {...props}
        >
            <div className="size-4">
                <BaseMenu.CheckboxItemIndicator>
                    <CheckIcon className="size-full" />
                </BaseMenu.CheckboxItemIndicator>
            </div>
            <span>{children}</span>
        </BaseMenu.CheckboxItem>
    )
}

const MenuRadioItem = ({ className, children, ref, ...props } : React.ComponentProps<typeof BaseMenu.RadioItem>) => {
    return (
        <BaseMenu.RadioItem
            ref={ref}
            className={cn(
                "flex select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
                className
            )}
            {...props}
        >
            <div className="size-4">
                <BaseMenu.RadioItemIndicator>
                    <CheckIcon className="size-full" />
                </BaseMenu.RadioItemIndicator>
            </div>
            <span>{children}</span>
        </BaseMenu.RadioItem>
    )
}

const MenuSubmenuTrigger = ({ className, children, ref, ...props } : React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) => {
    return (
	<BaseMenu.SubmenuTrigger
		ref={ref}
		className={cn(
			"flex select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[popup-open]:bg-accent data-[highlighted]:text-accent-foreground data-[popup-open]:text-accent-foreground data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
			className
		)}
		{...props}
	>
		{children}
		<ChevronRightIcon className="ml-auto size-3" />
	</BaseMenu.SubmenuTrigger>
)}

function ArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-200 dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-gray-300"
      />
    </svg>
  );
}


Menu.Root = BaseMenu.Root
Menu.Trigger = BaseMenu.Trigger
Menu.Content = MenuContent
Menu.Item = MenuItem
Menu.Separator = MenuSeparator
Menu.Group = BaseMenu.Group
Menu.GroupLabel = MenuGroupLabel
Menu.CheckboxItem = MenuCheckboxItem
Menu.RadioGroup = BaseMenu.RadioGroup
Menu.RadioItem = MenuRadioItem
Menu.SubmenuTrigger = MenuSubmenuTrigger

export { Menu }