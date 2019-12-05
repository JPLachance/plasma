import * as React from 'react';
import {Section} from '../../section/Section';
import {MiddleSlider} from '../MiddleSlider';
import {Slider} from '../Slider';

export class SliderExamples extends React.Component<any, any> {
    render() {
        const style = {width: 600, margin: 25};
        return (
            <div className="mt2">
                <div className="form-group">
                    <label className="form-control-label">Default Slider</label>
                    <div className="form-control">
                        <div style={style}>
                            <Slider classes={['class1', 'class2']} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-control-label">Slider with default value</label>
                    <div className="form-control">
                        <div style={style}>
                            <Slider slider={{defaultValue: 20}} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-control-label">Slider with marks</label>
                    <div className="form-control">
                        <div style={style}>
                            <Slider
                                slider={{
                                    marks: {
                                        0: 'Lower',
                                        50: 'Middle',
                                        100: 'Higher',
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-control-label">Slider with tooltip</label>
                    <div className="form-control">
                        <div style={style}>
                            <Slider hasTooltip={true} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-control-label">Slider with tooltip and value formatter</label>
                    <div className="form-control">
                        <div style={style}>
                            <Slider hasTooltip={true} slider={{tipFormatter: (value: number) => `${value}$`}} />
                        </div>
                    </div>
                </div>

                {/* <div className="form-group">
                    <label className="form-control-label">
                        Slider with tooltip and value formatter (always showing)
                    </label>
                    <div className="form-control">
                        <div style={style}>
                            <Slider
                                hasTooltip={true}
                                slider={{
                                    tipFormatter: (value: number) => `${value}$`,
                                    tipProps: {visible: true},
                                }}
                            />
                        </div>
                    </div>
                </div> */}
                <Section title="MiddleSlider with asymetric range and initial value">
                    <MiddleSlider
                        range={[-2000, 10000]}
                        id="asymetricRangeId"
                        initialValue={2000}
                        marks={{0: '-2000', 33: '2000', 17: '0', 100: '10,000'}}
                    />
                </Section>
                <Section title="MiddleSlider with marks and steps">
                    <MiddleSlider
                        range={[-10000, 10000]}
                        id="rangeSliderId"
                        marks={{
                            0: '-100%',
                            25: '-50%',
                            50: '0',
                            75: '50%',
                            100: '100%',
                        }}
                        step={25}
                    />
                </Section>
                <Section title="with tooltip not working">
                    <MiddleSlider range={[-500, 500]} id="another-id" hasTooltip />
                </Section>
            </div>
        );
    }
}
