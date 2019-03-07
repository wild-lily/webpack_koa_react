import Router from 'koa-router';

const router = Router();

export default router;

router.get('/getMenuList', (ctx) => {
    ctx.body = JSON.stringify([{
        title: '首页',
        pathname: '/home',
        icon: 'home',
    }, {
        title: '视觉单元',
        pathname: '/visualUnit',
        icon: 'dot-chart',
        children: [{
            title: '视觉单元列表',
            pathname: '/visualUnit/list',
            icon: 'bars',
        }, {
            title: '新增视觉单元',
            pathname: '/visualUnit/add',
            icon: 'plus',
        }],
    }, {
        title: '模版库',
        pathname: '/dashboard',
        icon: 'folder',
        children: [{
            title: '模版列表',
            pathname: '/dashboard/list',
            icon: 'bars',
        }, {
            title: '新增模版',
            pathname: '/dashboard/add',
            icon: 'plus',
        }],
    }, {
        title: '个性化',
        pathname: '/custom',
        icon: 'customer-service',
    }]);
});

