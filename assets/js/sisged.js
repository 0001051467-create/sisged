/* SISGED - MVP front-end estático. Todos os dados abaixo são fictícios. */
const hoje = new Date(), P = document.body.dataset.page;
const D = {
  instrutores: [["Carlos Menezes","Eletroeletrônica",12,1],["Fernanda Lopes","Desenvolvimento de Sistemas",9,1],["Ricardo Alves","Mecânica Industrial",7,1],["Juliana Rocha","Redes de Computadores",5,0]],
  salas: [["Laboratório 03","Bloco B","Laboratório",20,"disponivel"],["Laboratório TI 02","Bloco C","Laboratório",24,"ocupada"],["Sala 05","Bloco A","Sala de aula",30,"disponivel"],["Sala 08","Bloco A","Sala de aula",35,"reservada"]],
  aulas: [[0,"08:00","12:00","ELE-2025-A","Instalações Elétricas","Carlos Menezes","Laboratório 03"],[0,"13:30","17:30","TI-2025-A","Desenvolvimento Web","Fernanda Lopes","Laboratório TI 02"],[1,"08:00","12:00","MEC-2025-A","Desenho Técnico","Ricardo Alves","Sala 05"],[2,"13:30","17:30","TI-2025-A","Redes de Computadores","Juliana Rocha","Laboratório TI 02"],[3,"08:00","12:00","ELE-2025-A","Comandos Elétricos","Carlos Menezes","Laboratório 03"],[5,"08:00","12:00","MEC-2025-A","Metrologia","Ricardo Alves","Sala 08"],[7,"13:30","17:30","TI-2025-A","Banco de Dados","Fernanda Lopes","Sala 05"]]
};
const dataAula = o => { const d = new Date(hoje); d.setDate(d.getDate() + o); return d; };
const fmt = d => d.toLocaleDateString("pt-BR");
const nav = [["dashboard","▦","Início"],["horarios","□","Consulta de Horários"],["instrutores","♙","Consulta de Instrutores"],["salas","▥","Consulta de Salas"],["relatorios","▥","Relatórios"]];

const pages = {
  dashboard() {
    const h = D.aulas.filter(a => a[0] === 0);
    const ini = new Date(hoje.getFullYear(), hoje.getMonth(), 1), dias = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
    let cal = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(x => `<div class="calendar-weekday">${x}</div>`).join("") + '<div class="calendar-day empty"></div>'.repeat(ini.getDay());
    for (let i = 1; i <= dias; i++) {
      const ev = D.aulas.filter(a => dataAula(a[0]).getDate() === i && dataAula(a[0]).getMonth() === hoje.getMonth());
      cal += `<div class="calendar-day ${i === hoje.getDate() ? "today" : ""}"><span class="calendar-date">${i}</span><div class="calendar-events">${ev.map(a => `<div class="calendar-event class">${a[1]} ${a[3]}</div>`).join("")}</div></div>`;
    }
    return `<section class="page-head"><div><h1>Painel Geral</h1><p>Visão geral da operação acadêmica (dados de demonstração)</p></div></section>
    <div class="stats">
      <div class="stat"><span>AULAS HOJE</span><strong>${h.length}</strong><small>Programadas para hoje</small></div>
      <div class="stat"><span>INSTRUTORES ATIVOS</span><strong>${D.instrutores.filter(i => i[3]).length}</strong><small>Instrutores disponíveis</small></div>
      <div class="stat"><span>SALAS DISPONÍVEIS</span><strong>${D.salas.filter(s => s[4] === "disponivel").length}</strong><small>Salas livres no momento</small></div>
      <div class="stat"><span>TURMAS EM ANDAMENTO</span><strong>3</strong><small>Turmas com status ativo</small></div></div>
    <div class="grid-2"><div class="panel"><div class="panel-head"><h2>Aulas de Hoje</h2><a href="horarios.html">Ver todas →</a></div><div class="agenda">${h.map(a => `<div class="agenda-row"><div class="time">${a[1]}</div><div><b>${a[4]}</b><br><small>${a[3]} · ${a[5]} · ${a[6]}</small></div></div>`).join("")}</div></div>
    <div class="panel"><div class="panel-head"><h2>Acesso rápido</h2></div><div class="quick"><a href="horarios.html">◷<b>Horários</b><small>Consultar aulas</small></a><a href="instrutores.html">♙<b>Instrutores</b><small>Ver equipe</small></a><a href="salas.html">▤<b>Salas</b><small>Disponibilidade</small></a><a href="relatorios.html">▥<b>Relatórios</b><small>Indicadores</small></a></div></div></div>
    <div class="panel calendar-panel"><div class="panel-head calendar-heading"><h2>Calendário acadêmico · ${hoje.toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}</h2></div><div class="calendar-grid">${cal}</div></div>`;
  },
  horarios() {
    return `<section class="page-head"><div><h1>Consulta de Horários</h1><p>Aulas programadas</p></div><button class="btn light" onclick="exportTable('tbH','horarios.csv')">Exportar CSV</button></section>
    <div class="panel"><div class="toolbar"><input id="busca" placeholder="⌕ Pesquisar aula..." oninput="filterCards('busca','.lin')"></div><div class="table-wrap"><table id="tbH"><thead><tr><th>Data</th><th>Horário</th><th>Turma</th><th>Matéria</th><th>Instrutor</th><th>Sala</th></tr></thead><tbody>${D.aulas.map(a => `<tr class="lin"><td>${fmt(dataAula(a[0]))}</td><td>${a[1]}–${a[2]}</td><td>${a[3]}</td><td>${a[4]}</td><td>${a[5]}</td><td>${a[6]}</td></tr>`).join("")}</tbody></table></div></div>`;
  },
  instrutores() {
    return `<section class="page-head"><div><h1>Consulta de Instrutores</h1><p>Equipe docente e carga de aulas</p></div></section>
    <div class="panel"><div class="toolbar"><input id="busca" placeholder="⌕ Pesquisar instrutor..." oninput="filterCards('busca','.lin')"></div><div class="table-wrap"><table><thead><tr><th>Instrutor</th><th>Área</th><th>Aulas</th><th>Status</th></tr></thead><tbody>${D.instrutores.map(i => `<tr class="lin"><td><div class="person"><span class="person-avatar">${i[0][0]}</span><b>${i[0]}</b></div></td><td>${i[1]}</td><td>${i[2]}</td><td><span class="status ${i[3] ? "green" : "danger"}">${i[3] ? "Ativo" : "Inativo"}</span></td></tr>`).join("")}</tbody></table></div></div>`;
  },
  salas() {
    const f = new URLSearchParams(location.search).get("status") || "";
    const tab = (v, t) => `<a class="${f === v ? "selected" : ""}" href="${v ? "?status=" + v : "salas.html"}">${t}</a>`;
    return `<section class="page-head"><div><h1>Consulta de Salas</h1><p>Disponibilidade, capacidade e recursos</p></div></section>
    <div class="tabs">${tab("", "Todas")}${tab("disponivel", "Disponíveis")}${tab("ocupada", "Ocupadas")}${tab("reservada", "Reservadas")}</div>
    <div class="rooms">${D.salas.filter(s => !f || s[4] === f).map(s => `<article class="room-card"><div class="room-icon">▤</div><div class="room-body"><div class="room-title"><h3>${s[0]}</h3><span class="status ${s[4]}">${s[4][0].toUpperCase() + s[4].slice(1)}</span></div><p><b>${s[1]}</b> · ${s[2]} · ${s[3]} lugares</p></div></article>`).join("")}</div>`;
  },
  relatorios() {
    const t = {}; D.aulas.forEach(a => t[a[3]] = (t[a[3]] || 0) + 1);
    return `<section class="page-head"><div><h1>Relatórios</h1><p>Indicadores de demonstração</p></div></section>
    <div class="panel"><div class="panel-head"><h2>Aulas programadas por turma</h2></div><div class="bars">${Object.entries(t).map(([k, v]) => `<div class="bar-row"><div><span>${k}</span><b>${v}</b></div><div class="bar"><i style="width:${v * 50}%"></i></div></div>`).join("")}</div></div>
    <div class="panel"><p class="muted">Nesta versão estática os números vêm de dados fictícios. Na versão completa viriam do banco de dados, por meio de uma API.</p></div>`;
  }
};

if (P !== "login") {
  const u = sessionStorage.getItem("sisged_user");
  if (!u) location.replace("index.html");
  else document.getElementById("app").innerHTML = `<aside class="sidebar"><div class="brand"><div class="brand-logos"><img src="assets/img/logo-sesi.png" class="brand-logo brand-logo-sesi" alt="SESI"><img src="assets/img/logo-senai.png" class="brand-logo brand-logo-senai" alt="SENAI"></div><div class="brand-copy"><small>Gestão Acadêmica</small></div></div>
  <nav class="sidebar-nav">${nav.map(n => `<a href="${n[0]}.html" class="${n[0] === P ? "active" : ""}"><span class="nav-ico">${n[1]}</span><span>${n[2]}</span></a>`).join("")}</nav>
  <a href="index.html" class="logout" onclick="sessionStorage.clear()"><span class="nav-ico">↪</span><span>Sair</span></a></aside>
  <main class="main"><header class="topbar"><div class="crumb"><span class="light">SGA</span> <span class="light">›</span> Sistema Web de Gestão Acadêmica</div><div class="top-actions"><div class="user-chip"><span class="avatar">DM</span><div>Usuário demonstração<div class="role">VISITANTE</div></div></div></div></header>${pages[P]()}</main>`;
}
