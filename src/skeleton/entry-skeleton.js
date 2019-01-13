import Vue from 'vue'
// 创建的骨架屏 Vue 实例
import SkeletonFinanceSubMenuMore from './SkeletonFinanceSubMenuMore'
import SkeletonInvestmentFinanceHome from './SkeletonInvestmentFinanceHome'
import SkeletonWalletHome from './SkeletonWalletHome'

export default new Vue({
    components: {
        SkeletonFinanceSubMenuMore,
        SkeletonInvestmentFinanceHome,
        SkeletonWalletHome
    },
    template: `
        <div>
            <SkeletonInvestmentFinanceHome id="skeleton-investmentfinancehome" style="display:none"/>
            <SkeletonFinanceSubMenuMore id="skeleton-financesubmenu-more" style="display:none"/>
            <SkeletonWalletHome id="skeleton-wallethome" style="display:none"/>
        </div>
    `
})