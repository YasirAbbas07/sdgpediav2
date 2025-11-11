class SDGCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    const goalNumber = this.getAttribute('goal-number');
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    const color = this.getAttribute('color') || 'primary';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .card {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          height: 100%;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 2px solid transparent;
        }
        .card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border-color: var(--${color}-200);
        }
        .number-circle {
          width: 6rem;
          height: 6rem;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 2rem;
          background-color: var(--${color}-100);
          color: var(--${color}-600);
          border: 3px solid var(--${color}-300);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .card:hover .number-circle {
          transform: rotate(15deg) scale(1.1);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }
        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #1a202c;
          position: relative;
          display: inline-block;
        }
        h3::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background: var(--${color}-400);
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        .card:hover h3::after {
          width: 80px;
          background: var(--${color}-600);
        }
        .short-desc {
          font-size: 0.9375rem;
          color: #4a5568;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .hover-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.98);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border-radius: 1.5rem;
          transform: translateY(10px) scale(0.95);
          backdrop-filter: blur(5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .card:hover .hover-content {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .targets {
          font-size: 0.8125rem;
          color: #2d3748;
          margin-top: 1rem;
          text-align: left;
          max-height: 60%;
          overflow-y: auto;
          padding-right: 0.5rem;
        }
.targets ul {
          padding-left: 1rem;
          margin: 0.5rem 0;
        }
        .targets li {
          margin-bottom: 0.25rem;
        }
        .learn-more {
          margin-top: 1rem;
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--${color}-600);
          padding: 0.5rem 1rem;
          border: 2px solid var(--${color}-200);
          border-radius: 2rem;
          transition: all 0.3s ease;
        }
        .learn-more:hover {
          background: var(--${color}-600);
          color: white;
          border-color: var(--${color}-600);
          transform: translateX(5px);
        }
</style>
      <div class="card">
        <div class="number-circle">${goalNumber}</div>
        <h3>${title}</h3>
        <p class="short-desc">${description}</p>
        
        <div class="hover-content">
          <h3>${title}</h3>
          <div class="targets">
            ${this.getTargets(goalNumber)}
          </div>
          <a href="goal-${goalNumber}.html" class="learn-more">Learn more →</a>
        </div>
      </div>
    `;
  }
  getTargets(goalNumber) {
    const targetsMap = {
      '1': '<ul><li>1.1: Eradicate extreme poverty</li><li>1.2: Reduce poverty by 50%</li><li>1.3: Implement social protection</li><li>1.4: Equal rights to resources</li><li>1.5: Build resilience to disasters</li></ul>',
      '2': '<ul><li>2.1: End hunger and ensure food access</li><li>2.2: End all malnutrition</li><li>2.3: Double agricultural productivity</li><li>2.4: Sustainable food systems</li><li>2.5: Maintain genetic diversity</li></ul>',
      '3': '<ul><li>3.1: Reduce maternal mortality</li><li>3.2: End preventable newborn deaths</li><li>3.3: End epidemics like AIDS</li><li>3.4: Reduce NCD mortality</li><li>3.5: Prevent substance abuse</li></ul>',
      '4': '<ul><li>4.1: Free quality primary/secondary education</li><li>4.2: Early childhood development</li><li>4.3: Affordable technical education</li><li>4.4: Increase relevant skills</li><li>4.5: Eliminate education disparities</li></ul>',
      '5': '<ul><li>5.1: End discrimination against women</li><li>5.2: End violence against women</li><li>5.3: Eliminate harmful practices</li><li>5.4: Recognize unpaid care work</li><li>5.5: Women in leadership</li></ul>',
      '6': '<ul><li>6.1: Safe drinking water for all</li><li>6.2: End open defecation</li><li>6.3: Improve water quality</li><li>6.4: Increase water-use efficiency</li><li>6.5: Implement water management</li></ul>',
      '7': '<ul><li>7.1: Universal energy access</li><li>7.2: Increase renewable energy</li><li>7.3: Double energy efficiency</li><li>7.a: Promote clean energy research</li><li>7.b: Expand energy infrastructure</li></ul>',
      '8': '<ul><li>8.1: Sustain economic growth</li><li>8.2: Diversify and innovate</li><li>8.3: Promote entrepreneurship</li><li>8.5: Full employment</li><li>8.8: Protect labor rights</li></ul>',
      '9': '<ul><li>9.1: Develop quality infrastructure</li><li>9.2: Promote industrialization</li><li>9.3: Increase SME access to finance</li><li>9.4: Upgrade sustainable industries</li><li>9.5: Enhance R&D</li></ul>',
      '10': '<ul><li>10.1: Reduce income inequality</li><li>10.2: Promote social inclusion</li><li>10.3: Ensure equal opportunity</li><li>10.4: Adopt fiscal policies</li><li>10.7: Facilitate migration</li></ul>',
      '11': '<ul><li>11.1: Safe housing for all</li><li>11.2: Affordable transport systems</li><li>11.3: Inclusive urbanization</li><li>11.4: Protect cultural heritage</li><li>11.6: Reduce environmental impact</li></ul>',
      '12': '<ul><li>12.1: Implement 10YFP</li><li>12.2: Sustainable resource use</li><li>12.3: Halve food waste</li><li>12.5: Reduce waste generation</li><li>12.8: Promote sustainability awareness</li></ul>',
      '13': '<ul><li>13.1: Strengthen resilience to disasters</li><li>13.2: Integrate climate measures</li><li>13.3: Improve education on climate</li><li>13.a: Implement UNFCCC</li><li>13.b: Raise capacity for planning</li></ul>',
      '14': '<ul><li>14.1: Reduce marine pollution</li><li>14.2: Protect marine ecosystems</li><li>14.3: Minimize ocean acidification</li><li>14.4: Regulate fishing</li><li>14.5: Conserve coastal areas</li></ul>',
      '15': '<ul><li>15.1: Conserve terrestrial ecosystems</li><li>15.2: Halt deforestation</li><li>15.3: Combat desertification</li><li>15.5: Protect biodiversity</li><li>15.9: Integrate ecosystem values</li></ul>',
      '16': '<ul><li>16.1: Reduce violence everywhere</li><li>16.2: End abuse against children</li><li>16.3: Promote rule of law</li><li>16.6: Develop effective institutions</li><li>16.7: Ensure inclusive decision-making</li></ul>',
      '17': '<ul><li>17.1: Strengthen domestic resource mobilization</li><li>17.2: Developed countries to implement ODA commitments</li><li>17.3: Mobilize additional financial resources</li><li>17.9: Enhance capacity-building support</li><li>17.14: Enhance policy coherence</li></ul>'
};
    return targetsMap[goalNumber] || '<p>Key targets for this goal</p>';
  }
}

customElements.define('sdg-card', SDGCard);
