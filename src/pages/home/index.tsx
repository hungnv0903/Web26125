import React from 'react'
import Header from './Header'

const HomePage = () => {
  return (
    <>
      <Header></Header>
      <section>
        <div className='text-3xl font-normal'>Discover more rewards</div>
        <div>
          <article>
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <span>Explore, earn, enjoy with cashback</span>
                <p>Travel more, save more, and turn every trip into a rewarding experience !</p>
                <a href="">Learn more</a>
              </div>
          </article>
          <article>
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <span>Manage and report travel costs effortlessly</span>
                <p>Gain full visibility into booking costs and travel budgets, with all invoices centralized in one place.</p>
                <a href="">Learn more</a>
              </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default HomePage