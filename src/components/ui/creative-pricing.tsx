import { Check } from "lucide-react";

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
}

function CreativePricing({
    tag = "Simple Pricing",
    title = "Make Short Videos That Pop",
    description = "Edit, enhance, and go viral in minutes",
    tiers,
}: {
    tag?: string;
    title?: string;
    description?: string;
    tiers: PricingTier[];
}) {
    return (
        <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <div style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 24,
                    color: '#3b82f6',
                    marginBottom: 12,
                }}>
                    {tag}
                </div>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <h2 style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: 'clamp(40px, 6vw, 60px)',
                        fontWeight: 700,
                        color: '#18181b',
                        margin: 0,
                    }}>
                        {title}
                    </h2>
                    <div style={{
                        position: 'absolute',
                        right: -52,
                        top: -20,
                        fontSize: 36,
                        transform: 'rotate(12deg)',
                    }}>
                        ✨
                    </div>
                    <div style={{
                        position: 'absolute',
                        left: -48,
                        bottom: -8,
                        fontSize: 30,
                        transform: 'rotate(-12deg)',
                    }}>
                        ⭐️
                    </div>
                </div>
                <p style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 22,
                    color: '#71717a',
                    marginTop: 8,
                }}>
                    {description}
                </p>
            </div>

            {/* Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 28,
                maxWidth: 960,
                margin: '0 auto',
            }}>
                {tiers.map((tier) => (
                    <div
                        key={tier.name}
                        style={{
                            position: 'relative',
                            background: '#ffffff',
                            border: '2px solid #18181b',
                            borderRadius: 16,
                            padding: '40px 32px 36px',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 540,
                            boxShadow: '4px 4px 0px 0px #18181b',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translate(-4px, -4px)';
                            e.currentTarget.style.boxShadow = '8px 8px 0px 0px #18181b';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translate(0, 0)';
                            e.currentTarget.style.boxShadow = '4px 4px 0px 0px #18181b';
                        }}
                    >
                        {/* Popular badge */}
                        {tier.popular && (
                            <div style={{
                                position: 'absolute',
                                top: -14,
                                right: 24,
                                background: '#fbbf24',
                                color: '#18181b',
                                fontFamily: "'Caveat', cursive",
                                fontSize: 18,
                                fontWeight: 700,
                                padding: '4px 16px',
                                borderRadius: 999,
                                border: '2px solid #18181b',
                                boxShadow: '2px 2px 0px 0px #18181b',
                                transform: 'rotate(12deg)',
                            }}>
                                Popular!
                            </div>
                        )}

                        {/* Icon */}
                        <div style={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            border: '2px solid #18181b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 24,
                            color: tier.color === 'amber' ? '#f59e0b' : tier.color === 'blue' ? '#3b82f6' : '#a855f7',
                        }}>
                            {tier.icon}
                        </div>

                        {/* Name */}
                        <h3 style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: 32,
                            fontWeight: 700,
                            color: '#18181b',
                            margin: '0 0 4px',
                        }}>
                            {tier.name}
                        </h3>

                        {/* Description */}
                        <p style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: 20,
                            color: '#71717a',
                            margin: '0 0 24px',
                        }}>
                            {tier.description}
                        </p>

                        {/* Price */}
                        <div style={{ marginBottom: 32 }}>
                            <span style={{
                                fontFamily: "'Caveat', cursive",
                                fontSize: 52,
                                fontWeight: 700,
                                color: '#18181b',
                            }}>
                                ${tier.price}
                            </span>
                            <span style={{
                                fontFamily: "'Caveat', cursive",
                                fontSize: 22,
                                color: '#71717a',
                                marginLeft: 4,
                            }}>
                                /month
                            </span>
                        </div>

                        {/* Features */}
                        <div style={{ flex: 1, marginBottom: 36 }}>
                            {tier.features.map((feature) => (
                                <div
                                    key={feature}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        marginBottom: 16,
                                    }}
                                >
                                    <div style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        border: '2px solid #18181b',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Check style={{ width: 14, height: 14, color: '#18181b' }} />
                                    </div>
                                    <span style={{
                                        fontFamily: "'Caveat', cursive",
                                        fontSize: 22,
                                        color: '#18181b',
                                    }}>
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Button — centered, NOT full width */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontSize: 22,
                                    fontWeight: 700,
                                    padding: '14px 48px',
                                    borderRadius: 14,
                                    border: '2px solid #18181b',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '4px 4px 0px 0px #18181b',
                                    background: tier.popular ? '#fbbf24' : '#f4f4f5',
                                    color: '#18181b',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                                    e.currentTarget.style.boxShadow = '6px 6px 0px 0px #18181b';
                                    e.currentTarget.style.background = tier.popular ? '#fcd34d' : '#e4e4e7';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translate(0, 0)';
                                    e.currentTarget.style.boxShadow = '4px 4px 0px 0px #18181b';
                                    e.currentTarget.style.background = tier.popular ? '#fbbf24' : '#f4f4f5';
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { CreativePricing };
export type { PricingTier };
