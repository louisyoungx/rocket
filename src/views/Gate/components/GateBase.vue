<template>
    <div class="all">
        <!--Navbar-->
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a class="navbar-brand col-sm-1 gate-bar-title" href="/Gate">
                云端智能锁
            </a>
            <div class="navbar-button-mobile">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebar-mobile" aria-controls="#sidebar-mobile" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

        </nav>
        <div class="container-fluid">
            <div class="row">
                <!--Sidebar Mobile-->
                <nav class="collapse col-md-2 d-md-block bg-light sidebar" id="sidebar-mobile">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link" v-bind:class="{ active: Status.Index }" href="/Gate/Index">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                    仪表盘 Dashboard<span class="sr-only">(current)</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" v-bind:class="{ active: Status.Records }" href="/Gate/Records">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                    记录 Records
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" v-bind:class="{ active: Status.Open }" href="/Gate/Open">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    开门 Open <span class="sr-only">(current)</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" v-bind:class="{ active: Status.Users }" href="/Gate/Users">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    用户 Users
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" v-bind:class="{ active: Status.Reports }" href="/Gate/Reports">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                    报告 Reports
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" v-bind:class="{ active: Status.Integrations }" href="/Gate/Integrations">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                    整合 Integrations
                                </a>
                            </li>
                        </ul>

                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>保存记录 Saved reports</span>
                            <a class="d-flex align-items-center text-muted" href="https://louisyoung.work">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </a>
                        </h6>
                        <ul class="nav flex-column mb-2">
                            <li class="nav-item">
                                <a class="nav-link" href="https://louisyoung.work">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    Current month
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://louisyoung.work">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    Last quarter
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://louisyoung.work">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    Social engagement
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://louisyoung.work">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    Year-end sale
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <!--Right Side-->
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>

                    <slot></slot>

                </main>
            </div>
        </div>
    </div>

</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.min'

    export default {
        name: "GateBase",
        data(){
            return{
                Status:{
                }
            }
        },
        mounted() {
            const Path = this.$route.path.substring(6);
            if (Path === 'Index'){
                this.Status.Index = true;
            }
            if (Path === 'Records'){
                this.Status.Records = true;
            }
            if (Path === 'Open'){
                this.Status.Open = true;
            }
            if (Path === 'Users'){
                this.Status.Users = true;
            }
            if (Path === 'Reports'){
                this.Status.Reports = true;
            }
            if (Path === 'Integrations'){
                this.Status.Integrations = true;
            }
            console.log(this.Status)
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    body{
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
    .feather {width: 16px;height: 16px;vertical-align: text-bottom;}
    .sidebar {position: fixed;top: 0;bottom: 0;left: 0;z-index: 100;padding: 0;box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);}
    .sidebar-sticky {position: -webkit-sticky;position: sticky;top: 48px; height: calc(100vh - 48px);padding-top: .5rem;overflow-x: hidden;overflow-y: auto; }
    .sidebar .nav-link {font-weight: 500;color: #333;}
    .sidebar .nav-link .feather {margin-right: 4px;color: #999;}
    .sidebar .nav-link.active {color: #007bff;}
    .sidebar .nav-link:hover .feather,.sidebar .nav-link.active .feather {color: inherit;}
    .sidebar-heading {font-size: .75rem;text-transform: uppercase;}
    .navbar-brand {padding-top: .75rem;padding-bottom: .75rem;font-size: 1rem;background-color: rgba(0, 0, 0, .25);box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);}
    .navbar .form-control {padding: .75rem 1rem;border-width: 0;border-radius: 0;}
    .form-control-dark {color: #fff;background-color: rgba(255, 255, 255, .1);border-color: rgba(255, 255, 255, .1);}
    .form-control-dark:focus {border-color: transparent;box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);}
    .border-top { border-top: 1px solid #e5e5e5; }
    .gate-bar-title{
        width: auto;
    }
    .all{
        height: 100vh;
    }
    .navbar-button-mobile{
        display: none;
    }
    @media screen and (max-width: 575px) {
        .navbar-button-mobile{
            display: block;
        }
    }
    .modal-body{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
