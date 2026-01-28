'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, MotionValue, PanInfo, useMotionValue, useTransform } from 'motion/react';
import { FiGithub, FiGlobe, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './ProjectCarousel.css';

export interface ProjectItem {
    id: number;
    title: string;
    description: string;
    category: string;
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
}

export interface ProjectCarouselProps {
    items: ProjectItem[];
    baseWidth?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    pauseOnHover?: boolean;
    loop?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 };

interface CarouselItemProps {
    item: ProjectItem;
    index: number;
    itemWidth: number;
    trackItemOffset: number;
    x: MotionValue<number>;
}

function CarouselItemComponent({ item, index, itemWidth, trackItemOffset, x }: CarouselItemProps) {
    const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
    const outputRange = [90, 0, -90];
    const rotateY = useTransform(x, range, outputRange, { clamp: false });

    return (
        <motion.div
            className="project-carousel-item"
            style={{
                width: itemWidth,
                rotateY: rotateY,
            }}
        >
            {/* Browser Mock */}
            <div className="project-browser">
                <div className="project-browser-header">
                    <div className="browser-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                </div>
                <div className="project-preview">
                    {/* Project Screenshot/Thumbnail */}
                    <div className="project-thumbnail">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.title}
                                className="project-thumbnail-img"
                            />
                        ) : (
                            <div className="project-thumbnail-placeholder">
                                <span>{item.title.charAt(0)}</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="project-actions">
                        {item.githubUrl && (
                            <a href={item.githubUrl} className="project-action-btn" title="View Source Code" target="_blank" rel="noopener noreferrer">
                                <FiGithub />
                            </a>
                        )}
                        {item.liveUrl && (
                            <a href={item.liveUrl} className="project-action-btn" title="View Live Site" target="_blank" rel="noopener noreferrer">
                                <FiGlobe />
                            </a>
                        )}
                    </div>

                    {/* Project Info Overlay */}
                    <div className="project-info-overlay">
                        <span className="project-category">{item.category}</span>
                        <h3 className="project-title">{item.title}</h3>
                        <p className="project-description">{item.description}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectCarousel({
    items,
    baseWidth = 600,
    autoplay = true,
    autoplayDelay = 4000,
    pauseOnHover = true,
    loop = true,
}: ProjectCarouselProps) {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (items.length === 0) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);

    const [position, setPosition] = useState<number>(loop ? 1 : 0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isJumping, setIsJumping] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;

        const timer = setInterval(() => {
            setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    useEffect(() => {
        const startingPosition = loop ? 1 : 0;
        setPosition(startingPosition);
        x.set(-startingPosition * trackItemOffset);
    }, [items.length, loop, trackItemOffset, x]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) {
            setIsAnimating(false);
            return;
        }
        const lastCloneIndex = itemsForRender.length - 1;

        if (position === lastCloneIndex) {
            setIsJumping(true);
            const target = 1;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        if (position === 0) {
            setIsJumping(true);
            const target = items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        setIsAnimating(false);
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
                ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
                    ? -1
                    : 0;

        if (direction === 0) return;

        setPosition(prev => {
            const next = prev + direction;
            const max = itemsForRender.length - 1;
            return Math.max(0, Math.min(next, max));
        });
    };

    const goToPrev = () => {
        setPosition(prev => Math.max(0, prev - 1));
    };

    const goToNext = () => {
        setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
                right: 0
            }
        };

    const activeIndex =
        items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

    return (
        <div className="project-carousel-wrapper">
            <div
                ref={containerRef}
                className="project-carousel-container"
                style={{ width: `${baseWidth}px` }}
            >
                <motion.div
                    className="project-carousel-track"
                    drag={isAnimating ? false : 'x'}
                    {...dragProps}
                    style={{
                        width: itemWidth,
                        gap: `${GAP}px`,
                        perspective: 1000,
                        perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
                        x
                    }}
                    onDragEnd={handleDragEnd}
                    animate={{ x: -(position * trackItemOffset) }}
                    transition={effectiveTransition}
                    onAnimationStart={() => setIsAnimating(true)}
                    onAnimationComplete={handleAnimationComplete}
                >
                    {itemsForRender.map((item, index) => (
                        <CarouselItemComponent
                            key={`${item?.id ?? index}-${index}`}
                            item={item}
                            index={index}
                            itemWidth={itemWidth}
                            trackItemOffset={trackItemOffset}
                            x={x}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="carousel-controls">
                <button className="carousel-nav-btn" onClick={goToPrev}>
                    <FiChevronLeft />
                </button>
                <div className="carousel-indicators">
                    {items.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`carousel-indicator ${activeIndex === index ? 'active' : ''}`}
                            animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                            onClick={() => setPosition(loop ? index + 1 : index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
                <button className="carousel-nav-btn" onClick={goToNext}>
                    <FiChevronRight />
                </button>
            </div>
        </div>
    );
}
