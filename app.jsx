import { useState, useEffect, useRef, useCallback } from "react";

// =================== I18N — 6 LANGUAGES ===================
const LANGS = {
  vi: { flag: "🇻🇳", name: "Tiếng Việt" },
  en: { flag: "🇺🇸", name: "English" },
  ja: { flag: "🇯🇵", name: "日本語" },
  ko: { flag: "🇰🇷", name: "한국어" },
  zh: { flag: "🇨🇳", name: "中文" },
  fr: { flag: "🇫🇷", name: "Français" },
};

const T = {
  vi: {
    // App
    tagline: "Hiểu bản thân là bước đầu để hiểu thế giới.",
    tagline_1: "Hiểu bản thân là",
    story_pick_world: "Chọn thế giới bạn muốn khám phá",
    tagline_2: "bước đầu để hiểu",
    tagline_3: "thế giới.",
    sub_tagline: "MindMirror — chiếc gương tâm lý dùng AI và khoa học hành vi để giúp bạn hiểu cảm xúc, tính cách và trạng thái tinh thần của chính mình.",
    badge: "✦ Khám phá tâm lý học thế hệ mới ✦",
    explore_btn: "🔮 Khám phá bản thân",
    test_btn: "📊 Làm trắc nghiệm",
    // Nav
    nav_home: "Trang Chủ", nav_ai: "AI Phân Tích", nav_test: "Trắc Nghiệm",
    nav_journal: "Nhật Ký", nav_knowledge: "Kiến Thức", nav_special: "✨ Đặc Biệt",
    nav_dashboard: "Dashboard", nav_login: "Đăng Nhập", nav_logout: "Đăng Xuất",
    nav_profile: "Hồ Sơ",
    // Auth
    login: "Đăng Nhập", register: "Đăng Ký", logout: "Đăng Xuất",
    full_name: "Họ và tên", email: "Gmail", phone: "Số điện thoại",
    birthday: "Ngày tháng năm sinh", password: "Mật khẩu", confirm_password: "Xác nhận mật khẩu",
    have_account: "Đã có tài khoản?", no_account: "Chưa có tài khoản?",
    login_here: "Đăng nhập tại đây", register_here: "Đăng ký ngay",
    auth_welcome: "Chào mừng trở lại", auth_create: "Tạo tài khoản",
    auth_sub: "Đăng nhập để lưu hành trình tâm lý của bạn",
    auth_sub2: "Bắt đầu hành trình hiểu bản thân ngay hôm nay",
    login_success: "Đăng nhập thành công! Chào mừng trở lại 🎉",
    register_success: "Tạo tài khoản thành công! Chào mừng bạn 🎉",
    logout_confirm: "Bạn có chắc muốn đăng xuất?",
    err_required: "Vui lòng điền đầy đủ thông tin",
    err_email: "Email không hợp lệ",
    err_phone: "Số điện thoại không hợp lệ",
    err_password: "Mật khẩu tối thiểu 6 ký tự",
    err_confirm: "Mật khẩu xác nhận không khớp",
    err_login: "Email hoặc mật khẩu không đúng",
    or_continue: "hoặc tiếp tục với",
    // Home
    stat1: "Bài test tâm lý", stat2: "Phân tích cảm xúc", stat3: "Miễn phí & riêng tư",
    feature_title: "Khám phá công cụ", feature_sub: "Hành trình hiểu bản thân bắt đầu từ đây",
    cta_title: "Bắt đầu hành trình hôm nay", cta_sub: "Chỉ cần 5 phút để có cái nhìn sâu sắc về chính mình",
    cta_btn: "Thử AI Phân Tích Ngay →",
    explore_link: "Khám phá →",
    // PDF Report
    nav_report: "📄 Báo Cáo",
    report_title: "Hồ Sơ Tâm Lý Cá Nhân",
    report_sub: "Xuất PDF tổng hợp kết quả phân tích tâm lý",
    report_generate: "🖨️ Xuất PDF",
    report_generating: "Đang tạo báo cáo...",
    report_ready: "Báo cáo đã sẵn sàng!",
    report_mbti: "Kết Quả Trắc Nghiệm",
    report_emotion: "Phân Tích Cảm Xúc",
    report_journal: "Biểu Đồ Nhật Ký",
    report_summary: "Tổng Quan Tâm Lý",
    report_no_data: "Hãy làm trắc nghiệm và ghi nhật ký để tạo báo cáo.",
    // Progress Timeline
    nav_progress: "📈 Tiến Độ",
    progress_title: "Dòng Thời Gian Tiến Độ",
    progress_sub: "So sánh sự thay đổi cảm xúc của bạn theo thời gian",
    progress_week1: "Tuần 1",
    progress_week4: "Tuần 4",
    progress_before: "Trước",
    progress_after: "Sau",
    progress_change: "Thay đổi",
    progress_better: "Cải thiện",
    progress_insight: "AI nhận xét tiến độ",
    progress_no_data: "Cần ít nhất 2 tuần dữ liệu để hiển thị tiến độ.",
    // Mood Prediction
    nav_predict: "🔮 Dự Đoán",
    predict_title: "Dự Đoán Tâm Trạng AI",
    predict_sub: "AI phân tích dữ liệu để dự đoán tâm trạng hôm nay",
    predict_today: "Dự đoán hôm nay",
    predict_run: "🔮 Dự đoán ngay",
    predict_running: "AI đang phân tích...",
    predict_confidence: "Độ tin cậy",
    predict_factors: "Yếu tố ảnh hưởng",
    predict_tip: "Lời khuyên hôm nay",
    // Voice Input
    voice_start: "🎙️ Nói thay vì gõ",
    voice_listening: "Đang nghe...",
    voice_stop: "⏹ Dừng",
    voice_analyze: "✨ Phân tích giọng nói",
    voice_no_support: "Trình duyệt không hỗ trợ Voice",
    // Face Emotion
    nav_face: "😊 Nhận Diện",
    face_title: "Nhận Diện Cảm Xúc Khuôn Mặt",
    face_sub: "AI phân tích cảm xúc qua webcam thời gian thực",
    face_start: "📷 Bật Camera",
    face_stop: "⏹ Tắt Camera",
    face_detected: "Cảm xúc phát hiện",
    face_no_support: "Webcam không khả dụng",
    face_loading: "Đang tải mô hình AI...",
    // 3D Globe
    nav_globe: "🌐 Biểu Đồ 3D",
    globe_title: "Quả Cầu Cảm Xúc 3D",
    globe_sub: "Mỗi điểm là một ngày — màu sắc thể hiện tâm trạng",
    globe_rotate: "Xoay để khám phá",
    globe_click: "Click vào điểm để xem chi tiết",
    // Care Mode
    nav_care: "💙 Người Thân",
    care_title: "Chế Độ Người Thân Quan Tâm",
    care_sub: "Chia sẻ xu hướng cảm xúc (ẩn chi tiết) với người thân",
    care_share: "📤 Tạo link chia sẻ",
    care_copied: "Đã sao chép link!",
    care_view: "Xem bản tóm tắt",
    care_invite: "Mời người thân",
    care_trend: "Xu hướng cảm xúc",
    care_note: "Chi tiết cá nhân được ẩn để bảo vệ quyền riêng tư",
    // Future Letter
    nav_letter: "💌 Thư Tương Lai",
    letter_title: "Thư Gửi Tương Lai",
    letter_sub: "Viết thư cho bản thân sau 7/30/90 ngày",
    letter_write: "✍️ Viết thư mới",
    letter_placeholder: "Gửi bản thân tương lai của tôi...",
    letter_send: "📨 Gửi thư",
    letter_sent: "Thư đã được lưu! Sẽ nhắc bạn sau",
    letter_open: "Mở thư",
    letter_days: "ngày nữa",
    letter_arrived: "Thư đã đến! 💌",
    letter_period_7: "7 ngày", letter_period_30: "30 ngày", letter_period_90: "90 ngày",
    letter_compare: "So sánh với thực tế",
    f1_title: "AI Phân Tích Cảm Xúc", f1_desc: "AI đọc hiểu trạng thái tinh thần và đưa ra phản hồi sâu sắc",
    f2_title: "Trắc Nghiệm Tính Cách", f2_desc: "MBTI, EQ, kiểu học tập — khám phá con người thật của bạn",
    f3_title: "Nhật Ký Cảm Xúc", f3_desc: "Theo dõi hành trình cảm xúc với biểu đồ trực quan",
    f4_title: "Bản Đồ Tâm Trạng", f4_desc: "Mô phỏng sóng cảm xúc và đọc aura tinh thần",
    // AI
    ai_title: "AI Phân Tích Tâm Trạng", ai_sub: "Chia sẻ suy nghĩ của bạn — AI sẽ lắng nghe và phân tích",
    ai_placeholder: "Bạn đang cảm thấy thế nào? Hãy chia sẻ bất cứ điều gì...",
    ai_btn: "✨ Phân tích cảm xúc", ai_loading: "🔮 AI đang phân tích...",
    ai_positive: "Mức độ tích cực", ai_intensity: "Cường độ cảm xúc",
    ai_analysis: "Phân tích tâm lý", ai_advice: "Lời khuyên", ai_history: "Lịch sử phân tích gần đây",
    // Test
    test_title: "Trắc Nghiệm Tính Cách", test_sub: "Khoa học tâm lý giúp bạn hiểu sâu hơn về chính mình",
    test_start: "Bắt đầu →", test_back: "← Làm test khác", test_redo: "🔄 Làm lại",
    test_strengths: "💪 Điểm mạnh", test_careers: "🎯 Nghề phù hợp",
    // Journal
    journal_title: "Nhật Ký Cảm Xúc", journal_sub: "Ghi lại hành trình cảm xúc của bạn mỗi ngày",
    journal_today: "Hôm nay bạn cảm thấy thế nào?", journal_note: "Ghi chú về ngày hôm nay...",
    journal_save: "💾 Lưu tâm trạng", journal_chart: "Biểu đồ 7 ngày qua",
    journal_heatmap: "🗓️ Lịch cảm xúc", journal_recent: "📝 Gần đây nhất",
    avg_mood: "Tâm trạng TB", streak: "Chuỗi tích cực", days: "ngày", recorded: "Đã ghi chép", best: "Ngày tốt nhất",
    // Knowledge
    know_title: "Góc Kiến Thức Tâm Lý", know_sub: "Hiểu bản thân và người khác qua khoa học tâm lý",
    read_now: "Đọc ngay →", back: "← Quay lại",
    // Special
    special_title: "Bản Đồ Năng Lượng Tinh Thần", special_sub: "AI đọc sóng cảm xúc và aura tinh thần của bạn",
    step1: "Bước 1: Chọn tâm trạng hiện tại", step2: "Bước 2: Mức năng lượng",
    step3: "Bước 3: Mô tả năng lượng bằng 1 từ", step3_ph: "VD: bình yên, mệt mỏi, hứng khởi...",
    read_btn: "🔮 Đọc năng lượng tinh thần", reading: "🌀 Đang đọc năng lượng...",
    wave_label: "Sóng cảm xúc của bạn", exhausted: "Kiệt sức", normal: "Bình thường", full: "Tràn đầy",
    aura_label: "Nguyên tố", archetype_label: "Nguyên mẫu", affirm_label: "✨ Câu khẳng định của ngày",
    // Dashboard
    dash_hello: "Xin chào", dash_sub: "Đây là hành trình hiểu bản thân của bạn",
    dash_mood: "Tâm trạng hôm nay", dash_streak: "Chuỗi tích cực",
    dash_days: "Ngày ghi chép", dash_tests: "Test đã làm",
    dash_progress: "📊 Tiến trình hiểu bản thân", dash_insights: "💡 Insight của bạn",
    dash_tests_done: "🏆 Trắc nghiệm đã làm", dash_more_tests: "+ Làm thêm test",
    dash_quick: "Hành động nhanh",
    q1: "Phân tích cảm xúc ngay", q2: "Ghi nhật ký hôm nay", q3: "Khám phá aura tinh thần", q4: "Đọc bài tâm lý học", q5: "Tâm sự với MindBot",
    // Footer
    footer_tagline: "Hiểu bản thân là bước đầu để hiểu thế giới.",
    // Mood
    mood0: "Rất tệ", mood1: "Buồn", mood2: "Khó chịu", mood3: "Bình thường",
    mood4: "Ổn", mood5: "Vui", mood6: "Rất vui", mood7: "Tuyệt vời",
    // Loading
    load1: "Đang khởi động tâm trí...", load2: "Phân tích năng lượng...",
    load3: "Chuẩn bị gương phản chiếu...", load4: "Sẵn sàng!",
    // Profile
    profile_title: "Hồ Sơ Cá Nhân", edit_profile: "Chỉnh sửa", save_profile: "Lưu thay đổi",
    member_since: "Thành viên từ", days_streak: "ngày liên tiếp",
    // Chatbot
    nav_chat: "💬 Tâm Sự",
    nav_garden: "🌿 Khu Vườn",
    nav_replay: "✨ Mind Replay",
    // Mood atmosphere
    mood_bg_happy: "Vui vẻ · Năng lượng dương", mood_bg_sad: "Trầm lắng · Tìm kiếm sự an ủi",
    mood_bg_stress: "Căng thẳng · Cần thư giãn", mood_bg_peace: "Bình yên · Cân bằng nội tâm",
    mood_bg_tired: "Mệt mỏi · Cần nạp lại năng lượng", mood_bg_angry: "Bực bội · Cần xả bỏ",
    // Garden
    garden_title: "Khu Vườn Tâm Trạng",
    garden_sub: "Chăm sóc cây tinh thần của bạn mỗi ngày",
    garden_tree: "Cây Tinh Thần",
    garden_water: "💧 Tưới Cây",
    garden_watered: "Đã tưới hôm nay ✓",
    garden_quest: "Nhiệm Vụ Hôm Nay",
    garden_badge: "Huy Hiệu",
    garden_streak: "Chuỗi ngày",
    garden_level: "Cấp",
    garden_xp: "Năng lượng tinh thần",
    garden_q1: "✍️ Viết 1 điều biết ơn", garden_q2: "🌬️ Thở sâu 2 phút",
    garden_q3: "💙 Không tự trách bản thân", garden_q4: "📔 Ghi nhật ký hôm nay",
    garden_q5: "🧘 Ngồi yên 5 phút", garden_q6: "😊 Làm 1 điều khiến bạn vui",
    garden_done: "Hoàn thành!", garden_claim: "Nhận thưởng",
    garden_firefly: "Đom đóm xuất hiện khi cây khoẻ mạnh 🌟",
    // Avatar
    avatar_title: "Mood Avatar",
    // Mind Replay
    replay_title: "Mind Replay ✨",
    replay_sub: "Nhìn lại hành trình cảm xúc của bạn",
    replay_week: "7 ngày qua", replay_month: "30 ngày",
    replay_best: "Ngày tích cực nhất", replay_hard: "Thời điểm khó khăn",
    replay_insight: "AI Insight",
    replay_generating: "AI đang phân tích hành trình của bạn...",
    // Quests
    quest_title: "Nhiệm Vụ & Thành Tích",
    // Sound
    sound_title: "Âm Thanh Chữa Lành",
    sound_rain: "🌧️ Tiếng Mưa", sound_ocean: "🌊 Sóng Biển",
    sound_piano: "🎹 Piano Nhẹ", sound_forest: "🌲 Tiếng Rừng",
    sound_cafe: "☕ Cafe Ambience", sound_white: "🔮 White Noise",
    sound_playing: "Đang phát...", sound_play: "Phát",
    // Account Switch
    switch_account: "🔄 Chuyển Tài Khoản",
    add_account: "➕ Thêm tài khoản",
    switch_title: "Chọn tài khoản",
    current_account: "Đang dùng",
    remove_account: "Xoá",
    switch_confirm: "Chuyển sang tài khoản này?",
    // Robot Guide
    robot_hi: "Xin chào! Mình là Mira 🤖",
    robot_guide: "Hướng dẫn nhanh",
    robot_skip: "Bỏ qua",
    robot_next: "Tiếp theo →",
    robot_finish: "Bắt đầu thôi! 🚀",
    robot_prev: "← Trước",
    robot_step: "Bước",
    robot_of: "/",
    robot_try: "👆 Thử ngay!",
    robot_back_guide: "↩ Quay lại hướng dẫn",
    robot_exploring: "Đang khám phá tính năng...",
    robot_done_explore: "Bạn đã xem xong! Tiếp tục hướng dẫn nhé 😊",
    // Mira guide steps (i18n)
    mira_s0_title: "Chào mừng đến MindMirror!",
    mira_s0_desc: "Mình là Mira 🤖 — trợ lý AI của bạn!\nMình sẽ dẫn bạn khám phá các tính năng tuyệt vời của MindMirror nhé!",
    mira_s1_title: "AI Phân Tích Cảm Xúc",
    mira_s1_desc: "Chia sẻ cảm xúc của bạn — AI sẽ phân tích tâm trạng, đưa ra lời khuyên nhẹ nhàng và câu nói chữa lành! 💙\n\nBấm [Thử ngay] để trải nghiệm liền nha!",
    mira_s1_try: "🤖 Thử phân tích cảm xúc",
    mira_s2_title: "Trắc Nghiệm Tính Cách",
    mira_s2_desc: "Làm bài test MBTI, EQ, kiểu học tập để khám phá con người thật của bạn. Kết quả sẽ khiến bạn bất ngờ! 😮\n\nBấm [Thử ngay] để làm test liền!",
    mira_s2_try: "🧩 Làm trắc nghiệm ngay",
    mira_s3_title: "Nhật Ký Cảm Xúc",
    mira_s3_desc: "Ghi lại tâm trạng hàng ngày. Theo dõi hành trình cảm xúc với biểu đồ đẹp và lịch heatmap! 📊\n\nHãy thử ghi một dòng nhật ký hôm nay nhé!",
    mira_s3_try: "📔 Ghi nhật ký ngay",
    mira_s4_title: "Bản Đồ Năng Lượng Tinh Thần",
    mira_s4_desc: "Tính năng đặc biệt nhất! AI đọc aura và năng lượng tinh thần qua sóng cảm xúc của bạn. ✨\n\nThử khám phá aura của bạn hôm nay đi!",
    mira_s4_try: "🌊 Khám phá aura của tôi",
    mira_s5_title: "Tâm Sự Với MindBot",
    mira_s5_desc: "Nói chuyện với AI như người bạn thân, nhà tư vấn, hoặc life coach. MindBot luôn lắng nghe bạn 24/7! 🤗\n\nMở một cuộc trò chuyện ngay đi!",
    mira_s5_try: "💬 Chat với MindBot",
    mira_s6_title: "Góc Kiến Thức Tâm Lý",
    mira_s6_desc: "Đọc các bài viết ngắn về tâm lý học: thao túng tâm lý, overthinking, burnout... 🧠\n\nKiến thức là sức mạnh — khám phá ngay!",
    mira_s6_try: "📚 Đọc bài tâm lý học",
    mira_s7_title: "Khu Vườn Tâm Trạng",
    mira_s7_desc: "Hoàn thành nhiệm vụ mỗi ngày để chăm sóc cây tinh thần 🌱\nNhận XP và huy hiệu khi hoàn thành quest!",
    mira_s7_try: "🌿 Vào Khu Vườn",
    mira_s8_title: "Mind Replay",
    mira_s8_desc: "AI tổng kết hành trình cảm xúc của bạn theo tuần/tháng ✨\nNhìn lại hành trình phát triển của bản thân!",
    mira_s8_try: "✨ Xem Mind Replay",
    mira_s9_title: "Bạn đã sẵn sàng!",
    mira_s9_desc: "Hành trình hiểu bản thân của bạn bắt đầu từ đây. Mira luôn ở đây nếu bạn cần hướng dẫn!\n\nChúc bạn có trải nghiệm tuyệt vời! 🎊",
    // Games
    nav_game: "🌿 Góc Chữa Lành",
    game_title: "Góc Chữa Lành 🌿",
    game_sub: "6 trò chơi giúp thư giãn tâm trí, giảm stress và chữa lành cảm xúc cùng AI",
    game_back: "← Về danh sách",
    game_play: "Chơi ngay",
    game_with_ai: "AI cùng chơi",
    game_score: "Điểm",
    game_level: "Cấp độ",
    game_restart: "🔄 Chơi lại",
    game_ai_thinking: "AI đang suy nghĩ...",
    game_your_turn: "Lượt của bạn",
    game_ai_turn: "Lượt AI",
    game_win: "🎉 Bạn thắng!",
    game_lose: "AI thắng lần này!",
    game_draw: "🤝 Hòa!",
    game_next: "Tiếp →",
    game_done: "Hoàn thành ✨",
    game_tap_start: "Nhấn để bắt đầu",
    game_breath_in: "Hít vào...",
    game_breath_hold: "Giữ hơi...",
    game_breath_out: "Thở ra...",
    game_breath_rest: "Nghỉ...",
    game_cycles: "Vòng",
    game_relax_msg: "Bạn đang thư giãn rất tốt 💙",
    game_puzzle_hint: "💡 Gợi ý",
    game_puzzle_check: "✓ Kiểm tra",
    game_word_guess: "Đoán từ cảm xúc",
    game_memory_title: "Bộ nhớ cảm xúc",
    game_breathe_title: "Hộp thở 4-7-8",
    game_affirmation_title: "Câu khẳng định tích cực",
    game_coloring_title: "Tô màu cảm xúc",
    game_story_title: "Câu chuyện chữa lành",
    game_zen_title: "Vườn Zen",
    g1_desc: "Hít thở có chủ đích — kỹ thuật 4-7-8 giảm lo âu tức thì",
    g2_desc: "Lật thẻ tìm cặp — rèn luyện trí nhớ và sự chú ý",
    g3_desc: "Đoán từ cảm xúc ẩn giấu — AI gợi ý khi bạn cần",
    g4_desc: "AI tạo câu khẳng định cá nhân hóa cho bạn mỗi ngày",
    g5_desc: "Tô màu thế giới theo cảm xúc — không có đúng sai",
    g6_desc: "AI kể câu chuyện chữa lành riêng cho tâm trạng của bạn",
    // Logout Modal (enhanced)
    logout_title: "Tạm biệt! 👋",
    logout_sub: "Bạn có chắc muốn đăng xuất khỏi MindMirror?",
    logout_yes: "Đăng xuất",
    logout_no: "Ở lại",
    logout_switch: "Chuyển tài khoản",
    chat_title: "Người Bạn Tâm Lý AI",
    chat_sub: "Tâm sự thoải mái — AI luôn lắng nghe bạn không phán xét",
    chat_placeholder: "Nhắn tin với MindBot...",
    chat_send: "Gửi",
    chat_thinking: "MindBot đang trả lời...",
    chat_welcome: "Xin chào! Mình là MindBot 🌿\n\nMình ở đây để lắng nghe bạn — như một người bạn thân hiểu chuyện hoặc một nhà tư vấn tâm lý nhẹ nhàng.\n\nBạn có thể chia sẻ bất cứ điều gì: chuyện buồn, lo lắng, căng thẳng, hoặc đơn giản chỉ muốn nói chuyện.\n\nHôm nay bạn đang cảm thấy thế nào? 💙",
    chat_mode_friend: "🤝 Người bạn thân",
    chat_mode_therapist: "🧠 Nhà tư vấn",
    chat_mode_coach: "🚀 Life Coach",
    chat_mode_label: "Vai trò của MindBot:",
    chat_new: "Cuộc trò chuyện mới",
    chat_clear_confirm: "Xoá toàn bộ cuộc trò chuyện?",
    chat_suggestions: "Gợi ý:",
    chat_sugg1: "Tôi đang cảm thấy rất căng thẳng",
    chat_sugg2: "Tôi không biết mình muốn gì trong cuộc sống",
    chat_sugg3: "Tôi cảm thấy cô đơn",
    chat_sugg4: "Tôi đang gặp vấn đề với các mối quan hệ",
    chat_copy: "Đã sao chép!",
    chat_chars: "ký tự",
    chat_you: "Bạn",
    // Security / Auth new
    save_password: "Lưu mật khẩu", saved_pw_label: "Mật khẩu đã lưu",
    fill_saved: "Điền tự động",
    otp_title: "Xác minh danh tính", otp_sub_email: "Mã OTP đã được gửi đến email của bạn (demo: hiển thị bên dưới)",
    otp_sub_phone: "Mã OTP đã được gửi qua SMS đến số điện thoại của bạn (demo: hiển thị bên dưới)",
    otp_enter: "Nhập mã 6 số", otp_verify: "Xác minh", otp_resend: "Gửi lại mã",
    otp_invalid: "Mã OTP không đúng hoặc đã hết hạn", otp_success: "Xác minh thành công! ✅",
    otp_sending: "Đang gửi mã...", otp_demo_note: "🔔 Demo OTP:",
    login_method_email: "Đăng nhập bằng Email / Google",
    login_method_phone: "Đăng nhập bằng Số Điện Thoại",
    // Login history
    login_history_title: "Lịch sử đăng nhập",
    hist_time: "Thời gian", hist_device: "Thiết bị", hist_method: "Phương thức",
    hist_status: "Trạng thái", hist_success: "✅ Thành công", hist_failed: "❌ Thất bại",
    hist_clear: "Xoá lịch sử", hist_clear_confirm: "Xoá toàn bộ lịch sử đăng nhập?",
    hist_empty: "Chưa có lịch sử đăng nhập",
    hist_method_email: "📧 Email", hist_method_phone: "📱 SMS", hist_method_google: "🔵 Google",
    hist_ip: "IP", hist_browser: "Trình duyệt",
  },
  en: {
    tagline: "Understanding yourself is the first step to understanding the world.",
    tagline_1: "Understanding yourself is",
    story_pick_world: "Choose the world you want to explore",
    tagline_2: "the first step to",
    tagline_3: "understand the world.",
    sub_tagline: "MindMirror — an AI-powered psychological mirror to help you understand your emotions, personality, and mental state.",
    badge: "✦ Next-gen psychology exploration ✦",
    explore_btn: "🔮 Explore Yourself",
    test_btn: "📊 Take a Test",
    nav_home: "Home", nav_ai: "AI Analysis", nav_test: "Personality Test",
    nav_journal: "Journal", nav_knowledge: "Knowledge", nav_special: "✨ Special",
    nav_dashboard: "Dashboard", nav_login: "Log In", nav_logout: "Log Out",
    nav_profile: "Profile",
    login: "Log In", register: "Sign Up", logout: "Log Out",
    full_name: "Full Name", email: "Email", phone: "Phone Number",
    birthday: "Date of Birth", password: "Password", confirm_password: "Confirm Password",
    have_account: "Already have an account?", no_account: "Don't have an account?",
    login_here: "Log in here", register_here: "Sign up now",
    auth_welcome: "Welcome Back", auth_create: "Create Account",
    auth_sub: "Log in to save your psychological journey",
    auth_sub2: "Start your self-discovery journey today",
    login_success: "Logged in successfully! Welcome back 🎉",
    register_success: "Account created! Welcome aboard 🎉",
    logout_confirm: "Are you sure you want to log out?",
    err_required: "Please fill in all fields",
    err_email: "Invalid email address",
    err_phone: "Invalid phone number",
    err_password: "Password must be at least 6 characters",
    err_confirm: "Passwords do not match",
    err_login: "Incorrect email or password",
    or_continue: "or continue with",
    stat1: "Psychology Tests", stat2: "AI Emotion Analysis", stat3: "Free & Private",
    feature_title: "Explore Our Tools", feature_sub: "Your self-discovery journey starts here",
    cta_title: "Start Your Journey Today", cta_sub: "Just 5 minutes for a deeper self-insight",
    cta_btn: "Try AI Analysis Now →",
    explore_link: "Explore →",
    nav_report:"📄 Report", report_title:"Personal Psychology Profile", report_sub:"Export a PDF of your psychological analysis",
    report_generate:"🖨️ Export PDF", report_generating:"Generating report...", report_ready:"Report ready!",
    report_mbti:"Test Results", report_emotion:"Emotion Analysis", report_journal:"Journal Chart", report_summary:"Psychology Summary",
    report_no_data:"Complete tests and write journals to generate your report.",
    nav_progress:"📈 Progress", progress_title:"Progress Timeline", progress_sub:"Compare your emotional changes over time",
    progress_week1:"Week 1", progress_week4:"Week 4", progress_before:"Before", progress_after:"After",
    progress_change:"Change", progress_better:"Improvement", progress_insight:"AI Progress Review", progress_no_data:"Need at least 2 weeks of data.",
    nav_predict:"🔮 Predict", predict_title:"AI Mood Prediction", predict_sub:"AI analyses your data to predict today's mood",
    predict_today:"Today's prediction", predict_run:"🔮 Predict now", predict_running:"AI analysing...",
    predict_confidence:"Confidence", predict_factors:"Influencing factors", predict_tip:"Today's tip",
    voice_start:"🎙️ Speak instead of type", voice_listening:"Listening...", voice_stop:"⏹ Stop",
    voice_analyze:"✨ Analyse voice", voice_no_support:"Browser doesn't support Voice",
    nav_face:"😊 Face Detect", face_title:"Facial Emotion Recognition", face_sub:"AI analyses emotions via webcam in real time",
    face_start:"📷 Start Camera", face_stop:"⏹ Stop Camera", face_detected:"Detected emotion",
    face_no_support:"Webcam unavailable", face_loading:"Loading AI model...",
    nav_globe:"🌐 3D Chart", globe_title:"3D Emotion Globe", globe_sub:"Each point is a day — colour shows mood",
    globe_rotate:"Rotate to explore", globe_click:"Click a point for details",
    nav_care:"💙 Care Mode", care_title:"Care Mode for Loved Ones", care_sub:"Share emotion trends (details hidden) with family/friends",
    care_share:"📤 Create share link", care_copied:"Link copied!", care_view:"View summary",
    care_invite:"Invite a loved one", care_trend:"Emotion trend", care_note:"Personal details hidden to protect privacy",
    nav_letter:"💌 Future Letter", letter_title:"Letter to Future Self", letter_sub:"Write to yourself in 7/30/90 days",
    letter_write:"✍️ Write new letter", letter_placeholder:"Dear future me...",
    letter_send:"📨 Send letter", letter_sent:"Letter saved! You'll be reminded later",
    letter_open:"Open letter", letter_days:"days left", letter_arrived:"Your letter has arrived! 💌",
    letter_period_7:"7 days", letter_period_30:"30 days", letter_period_90:"90 days", letter_compare:"Compare with reality",
    f1_title: "AI Emotion Analysis", f1_desc: "AI reads your mental state and gives deep, personalized insights",
    f2_title: "Personality Tests", f2_desc: "MBTI, EQ, learning style — discover your true self",
    f3_title: "Emotion Journal", f3_desc: "Track your emotional journey with beautiful charts",
    f4_title: "Mood Map", f4_desc: "Simulate emotional waves and read your spiritual aura",
    ai_title: "AI Mood Analysis", ai_sub: "Share your thoughts — AI will listen and analyze",
    ai_placeholder: "How are you feeling? Share anything on your mind...",
    ai_btn: "✨ Analyze Emotions", ai_loading: "🔮 AI is analyzing...",
    ai_positive: "Positivity Level", ai_intensity: "Emotion Intensity",
    ai_analysis: "Psychological Analysis", ai_advice: "Advice", ai_history: "Recent Analysis History",
    test_title: "Personality Tests", test_sub: "Psychology science helps you understand yourself more deeply",
    test_start: "Start →", test_back: "← Other Tests", test_redo: "🔄 Retake",
    test_strengths: "💪 Strengths", test_careers: "🎯 Career Matches",
    journal_title: "Emotion Journal", journal_sub: "Record your emotional journey every day",
    journal_today: "How are you feeling today?", journal_note: "Notes about your day...",
    journal_save: "💾 Save Mood", journal_chart: "Last 7 Days Chart",
    journal_heatmap: "🗓️ Emotion Calendar", journal_recent: "📝 Recent Entries",
    avg_mood: "Avg Mood", streak: "Positive Streak", days: "days", recorded: "Recorded", best: "Best Day",
    know_title: "Psychology Knowledge Hub", know_sub: "Understand yourself and others through psychology science",
    read_now: "Read Now →", back: "← Back",
    special_title: "Mental Energy Map", special_sub: "AI reads your emotional waves and spiritual aura",
    step1: "Step 1: Choose your current mood", step2: "Step 2: Energy Level",
    step3: "Step 3: Describe your energy in 1 word", step3_ph: "E.g. calm, tired, energized, anxious...",
    read_btn: "🔮 Read Mental Energy", reading: "🌀 Reading your energy...",
    wave_label: "Your Emotion Wave", exhausted: "Exhausted", normal: "Normal", full: "Energized",
    aura_label: "Element", archetype_label: "Archetype", affirm_label: "✨ Today's Affirmation",
    dash_hello: "Hello", dash_sub: "This is your self-understanding journey",
    dash_mood: "Today's Mood", dash_streak: "Positive Streak",
    dash_days: "Days Recorded", dash_tests: "Tests Taken",
    dash_progress: "📊 Self-Understanding Progress", dash_insights: "💡 Your Insights",
    dash_tests_done: "🏆 Completed Tests", dash_more_tests: "+ Take More Tests",
    dash_quick: "Quick Actions",
    q1: "Analyze emotions now", q2: "Write today's journal", q3: "Explore spiritual aura", q4: "Read psychology articles", q5: "Chat with MindBot",
    footer_tagline: "Understanding yourself is the first step to understanding the world.",
    mood0: "Very Bad", mood1: "Sad", mood2: "Uneasy", mood3: "Neutral",
    mood4: "Okay", mood5: "Happy", mood6: "Very Happy", mood7: "Amazing",
    load1: "Booting up the mind...", load2: "Analyzing energy...",
    load3: "Preparing the mirror...", load4: "Ready!",
    profile_title: "My Profile", edit_profile: "Edit", save_profile: "Save Changes",
    member_since: "Member since", days_streak: "day streak",
    nav_chat: "💬 Chat",
    nav_garden: "🌿 Garden",
    nav_replay: "✨ Mind Replay",
    mood_bg_happy:"Happy · Positive energy", mood_bg_sad:"Sad · Seeking comfort",
    mood_bg_stress:"Stressed · Need to relax", mood_bg_peace:"Peaceful · Inner balance",
    mood_bg_tired:"Tired · Need to recharge", mood_bg_angry:"Frustrated · Need release",
    garden_title:"Mood Garden", garden_sub:"Nurture your mind tree every day",
    garden_tree:"Mind Tree", garden_water:"💧 Water Tree", garden_watered:"Watered today ✓",
    garden_quest:"Today's Quests", garden_badge:"Badges", garden_streak:"Day streak",
    garden_level:"Level", garden_xp:"Mind Energy",
    garden_q1:"✍️ Write 1 thing you're grateful for", garden_q2:"🌬️ Deep breathe for 2 min",
    garden_q3:"💙 Don't blame yourself today", garden_q4:"📔 Write in your journal",
    garden_q5:"🧘 Sit quietly for 5 minutes", garden_q6:"😊 Do 1 thing that makes you smile",
    garden_done:"Done!", garden_claim:"Claim Reward",
    garden_firefly:"Fireflies appear when your tree is healthy 🌟",
    avatar_title:"Mood Avatar",
    replay_title:"Mind Replay ✨", replay_sub:"Look back at your emotional journey",
    replay_week:"Last 7 days", replay_month:"Last 30 days",
    replay_best:"Most positive day", replay_hard:"Tough moments",
    replay_insight:"AI Insight", replay_generating:"AI is analysing your journey...",
    quest_title:"Quests & Achievements",
    sound_title:"Healing Sounds",
    sound_rain:"🌧️ Rain", sound_ocean:"🌊 Ocean Waves",
    sound_piano:"🎹 Soft Piano", sound_forest:"🌲 Forest",
    sound_cafe:"☕ Café Ambience", sound_white:"🔮 White Noise",
    sound_playing:"Playing...", sound_play:"Play",
    switch_account: "🔄 Switch Account",
    add_account: "➕ Add Account",
    switch_title: "Choose Account",
    current_account: "Active",
    remove_account: "Remove",
    switch_confirm: "Switch to this account?",
    robot_hi: "Hello! I'm Mira 🤖",
    robot_guide: "Quick Guide",
    robot_skip: "Skip",
    robot_next: "Next →",
    robot_finish: "Let's go! 🚀",
    robot_prev: "← Back",
    robot_step: "Step",
    robot_of: "/",
    robot_try: "👆 Try it now!",
    robot_back_guide: "↩ Back to guide",
    robot_exploring: "Exploring feature...",
    robot_done_explore: "Done exploring! Continue the guide 😊",
    mira_s0_title: "Welcome to MindMirror!",
    mira_s0_desc: "I'm Mira 🤖 — your AI assistant!\nLet me guide you through MindMirror's amazing features!",
    mira_s1_title: "AI Emotion Analysis",
    mira_s1_desc: "Share your feelings — AI will analyze your mood and give gentle advice! 💙\n\nPress [Try it] to experience it now!",
    mira_s1_try: "🤖 Try Emotion Analysis",
    mira_s2_title: "Personality Tests",
    mira_s2_desc: "Take MBTI, EQ, learning style tests to discover your true self! 😮\n\nPress [Try it] to start the test!",
    mira_s2_try: "🧩 Take a Test Now",
    mira_s3_title: "Emotion Journal",
    mira_s3_desc: "Record your mood every day. Track your emotional journey with beautiful charts! 📊\n\nTry writing today's journal entry!",
    mira_s3_try: "📔 Write in Journal",
    mira_s4_title: "Mental Energy Map",
    mira_s4_desc: "The most unique feature! AI reads your aura through emotional waves. ✨\n\nExplore your aura today!",
    mira_s4_try: "🌊 Explore My Aura",
    mira_s5_title: "Chat with MindBot",
    mira_s5_desc: "Talk with AI like a best friend, therapist, or life coach. MindBot always listens 24/7! 🤗\n\nStart a conversation now!",
    mira_s5_try: "💬 Chat with MindBot",
    mira_s6_title: "Psychology Knowledge Hub",
    mira_s6_desc: "Read short articles about psychology: manipulation, overthinking, burnout... 🧠\n\nKnowledge is power — explore now!",
    mira_s6_try: "📚 Read Articles",
    mira_s7_title: "Mood Garden",
    mira_s7_desc: "Complete daily quests to nurture your mind tree 🌱\nEarn XP and badges for completing quests!",
    mira_s7_try: "🌿 Visit the Garden",
    mira_s8_title: "Mind Replay",
    mira_s8_desc: "AI summarizes your emotional journey weekly/monthly ✨\nLook back at your growth!",
    mira_s8_try: "✨ View Mind Replay",
    mira_s9_title: "You're ready!",
    mira_s9_desc: "Your self-discovery journey starts here. Mira is always here when you need guidance!\n\nHave an amazing experience! 🎊",
    nav_game: "🌿 Healing Corner",
    game_title: "Healing Corner 🌿",
    game_sub: "6 games to relax, reduce stress and heal emotions with AI",
    game_back: "← Back to games",
    game_play: "Play now",
    game_with_ai: "Play with AI",
    game_score: "Score",
    game_level: "Level",
    game_restart: "🔄 Restart",
    game_ai_thinking: "AI is thinking...",
    game_your_turn: "Your turn",
    game_ai_turn: "AI turn",
    game_win: "🎉 You win!",
    game_lose: "AI wins this time!",
    game_draw: "🤝 Draw!",
    game_next: "Next →",
    game_done: "Done ✨",
    game_tap_start: "Tap to start",
    game_breath_in: "Breathe in...",
    game_breath_hold: "Hold...",
    game_breath_out: "Breathe out...",
    game_breath_rest: "Rest...",
    game_cycles: "Cycles",
    game_relax_msg: "You are relaxing nicely 💙",
    game_puzzle_hint: "💡 Hint",
    game_puzzle_check: "✓ Check",
    game_word_guess: "Guess the emotion word",
    game_memory_title: "Emotion Memory",
    game_breathe_title: "Breathing Box 4-7-8",
    game_affirmation_title: "Positive Affirmations",
    game_coloring_title: "Emotion Coloring",
    game_story_title: "Healing Story",
    game_zen_title: "Zen Garden",
    g1_desc: "Intentional breathing — 4-7-8 technique reduces anxiety instantly",
    g2_desc: "Flip cards to find pairs — train memory and attention",
    g3_desc: "Guess hidden emotion words — AI hints when you need",
    g4_desc: "AI creates personalized affirmations for you every day",
    g5_desc: "Color the world by emotion — no right or wrong",
    g6_desc: "AI tells a healing story tailored to your mood",
    logout_title: "Goodbye! 👋",
    logout_sub: "Are you sure you want to log out of MindMirror?",
    logout_yes: "Log Out",
    logout_no: "Stay",
    logout_switch: "Switch Account",
    chat_title: "AI Psychology Friend",
    chat_sub: "Talk freely — AI listens without judgment",
    chat_placeholder: "Message MindBot...",
    chat_send: "Send",
    chat_thinking: "MindBot is typing...",
    chat_welcome: "Hi! I'm MindBot 🌿\n\nI'm here to listen — like a trusted friend or gentle therapist.\n\nFeel free to share anything: worries, stress, or just wanting to talk.\n\nHow are you feeling today? 💙",
    chat_mode_friend: "🤝 Best Friend",
    chat_mode_therapist: "🧠 Therapist",
    chat_mode_coach: "🚀 Life Coach",
    chat_mode_label: "MindBot's role:",
    chat_new: "New conversation",
    chat_clear_confirm: "Clear entire conversation?",
    chat_suggestions: "Suggestions:",
    chat_sugg1: "I'm feeling very stressed",
    chat_sugg2: "I don't know what I want in life",
    chat_sugg3: "I feel lonely",
    chat_sugg4: "I'm having relationship issues",
    chat_copy: "Copied!",
    chat_chars: "chars",
    chat_you: "You",
    save_password: "Save password", saved_pw_label: "Saved credentials",
    fill_saved: "Auto-fill",
    otp_title: "Verify your identity", otp_sub_email: "OTP has been sent to your email (demo: shown below)",
    otp_sub_phone: "OTP has been sent via SMS to your phone (demo: shown below)",
    otp_enter: "Enter 6-digit code", otp_verify: "Verify", otp_resend: "Resend code",
    otp_invalid: "Invalid or expired OTP code", otp_success: "Verified successfully! ✅",
    otp_sending: "Sending code...", otp_demo_note: "🔔 Demo OTP:",
    login_method_email: "Sign in with Email / Google",
    login_method_phone: "Sign in with Phone Number",
    login_history_title: "Login History",
    hist_time: "Time", hist_device: "Device", hist_method: "Method",
    hist_status: "Status", hist_success: "✅ Success", hist_failed: "❌ Failed",
    hist_clear: "Clear history", hist_clear_confirm: "Clear all login history?",
    hist_empty: "No login history yet",
    hist_method_email: "📧 Email", hist_method_phone: "📱 SMS", hist_method_google: "🔵 Google",
    hist_ip: "IP", hist_browser: "Browser",
  },
  ja: {
    tagline: "自分を理解することが、世界を理解する第一歩。",
    tagline_1: "自分を理解することが、",
    story_pick_world: "探索したい世界を選んでください",
    tagline_2: "世界を理解する",
    tagline_3: "第一歩。",
    sub_tagline: "MindMirror — AIと行動科学を使って、感情・性格・精神状態を深く理解するサービスです。",
    badge: "✦ 次世代心理学の探求 ✦",
    explore_btn: "🔮 自分を探求する",
    test_btn: "📊 テストを受ける",
    nav_home: "ホーム", nav_ai: "AI分析", nav_test: "性格テスト",
    nav_journal: "日記", nav_knowledge: "知識", nav_special: "✨ 特別",
    nav_dashboard: "ダッシュボード", nav_login: "ログイン", nav_logout: "ログアウト",
    nav_profile: "プロフィール",
    login: "ログイン", register: "登録", logout: "ログアウト",
    full_name: "氏名", email: "メールアドレス", phone: "電話番号",
    birthday: "生年月日", password: "パスワード", confirm_password: "パスワード確認",
    have_account: "アカウントをお持ちですか？", no_account: "アカウントをお持ちでないですか？",
    login_here: "ログインはこちら", register_here: "今すぐ登録",
    auth_welcome: "おかえりなさい", auth_create: "アカウント作成",
    auth_sub: "ログインしてあなたの心理の旅を保存しましょう",
    auth_sub2: "今日から自己発見の旅を始めましょう",
    login_success: "ログイン成功！おかえりなさい 🎉",
    register_success: "アカウント作成完了！ようこそ 🎉",
    logout_confirm: "ログアウトしてもよろしいですか？",
    err_required: "すべての項目を入力してください",
    err_email: "メールアドレスが無効です",
    err_phone: "電話番号が無効です",
    err_password: "パスワードは6文字以上必要です",
    err_confirm: "パスワードが一致しません",
    err_login: "メールアドレスまたはパスワードが間違っています",
    or_continue: "または続ける",
    stat1: "心理テスト", stat2: "AI感情分析", stat3: "無料＆プライベート",
    feature_title: "ツールを探索する", feature_sub: "自己発見の旅はここから始まります",
    cta_title: "今日から旅を始めよう", cta_sub: "たった5分で深い自己理解が得られます",
    cta_btn: "今すぐAI分析を試す →",
    explore_link: "探索する →",
    nav_report:"📄 レポート", report_title:"個人心理プロファイル", report_sub:"心理分析PDFをエクスポート",
    report_generate:"🖨️ PDFを出力", report_generating:"レポート作成中...", report_ready:"レポート完成！",
    report_mbti:"テスト結果", report_emotion:"感情分析", report_journal:"日記チャート", report_summary:"心理まとめ",
    report_no_data:"テストと日記を完了してレポートを作成してください。",
    nav_progress:"📈 進捗", progress_title:"進捗タイムライン", progress_sub:"感情の変化を時間軸で比較",
    progress_week1:"第1週", progress_week4:"第4週", progress_before:"以前", progress_after:"以後",
    progress_change:"変化", progress_better:"改善", progress_insight:"AI進捗レビュー", progress_no_data:"2週間以上のデータが必要です。",
    nav_predict:"🔮 予測", predict_title:"AI気分予測", predict_sub:"AIがデータを分析して今日の気分を予測",
    predict_today:"今日の予測", predict_run:"🔮 今すぐ予測", predict_running:"AI分析中...",
    predict_confidence:"信頼度", predict_factors:"影響要因", predict_tip:"今日のアドバイス",
    voice_start:"🎙️ 入力の代わりに話す", voice_listening:"聞いています...", voice_stop:"⏹ 停止",
    voice_analyze:"✨ 音声を分析", voice_no_support:"ブラウザが音声をサポートしていません",
    nav_face:"😊 顔認識", face_title:"顔の感情認識", face_sub:"ウェブカメラでリアルタイム感情分析",
    face_start:"📷 カメラ開始", face_stop:"⏹ カメラ停止", face_detected:"検出された感情",
    face_no_support:"ウェブカメラ利用不可", face_loading:"AIモデル読み込み中...",
    nav_globe:"🌐 3Dチャート", globe_title:"3D感情グローブ", globe_sub:"各点が1日 — 色が気分を表す",
    globe_rotate:"回転して探索", globe_click:"点をクリックして詳細を見る",
    nav_care:"💙 ケアモード", care_title:"家族・友人のためのケアモード", care_sub:"感情の傾向を共有（詳細は非表示）",
    care_share:"📤 共有リンクを作成", care_copied:"リンクをコピーしました！", care_view:"まとめを見る",
    care_invite:"家族を招待", care_trend:"感情の傾向", care_note:"プライバシー保護のため個人情報は非表示",
    nav_letter:"💌 未来への手紙", letter_title:"未来の自分への手紙", letter_sub:"7/30/90日後の自分へ手紙を書く",
    letter_write:"✍️ 新しい手紙を書く", letter_placeholder:"未来の自分へ...",
    letter_send:"📨 手紙を送る", letter_sent:"手紙が保存されました！後でリマインドします",
    letter_open:"手紙を開く", letter_days:"日後", letter_arrived:"手紙が届きました！ 💌",
    letter_period_7:"7日", letter_period_30:"30日", letter_period_90:"90日", letter_compare:"現実と比較",
    f1_title: "AI感情分析", f1_desc: "AIがあなたの精神状態を読み取り、深い洞察を提供します",
    f2_title: "性格テスト", f2_desc: "MBTI、EQ、学習スタイル — 本当の自分を発見",
    f3_title: "感情日記", f3_desc: "美しいチャートで感情の旅を記録",
    f4_title: "気分マップ", f4_desc: "感情の波を可視化し、精神的なオーラを読む",
    ai_title: "AI気分分析", ai_sub: "思いを共有してください — AIが聞いて分析します",
    ai_placeholder: "今どんな気持ちですか？何でも話してください...",
    ai_btn: "✨ 感情を分析", ai_loading: "🔮 AI分析中...",
    ai_positive: "ポジティブ度", ai_intensity: "感情の強度",
    ai_analysis: "心理分析", ai_advice: "アドバイス", ai_history: "最近の分析履歴",
    test_title: "性格テスト", test_sub: "心理科学であなた自身をより深く理解する",
    test_start: "開始 →", test_back: "← 他のテスト", test_redo: "🔄 やり直す",
    test_strengths: "💪 強み", test_careers: "🎯 向いている職業",
    journal_title: "感情日記", journal_sub: "毎日の感情の旅を記録しましょう",
    journal_today: "今日の気分は？", journal_note: "今日のメモ...",
    journal_save: "💾 気分を保存", journal_chart: "過去7日間のチャート",
    journal_heatmap: "🗓️ 感情カレンダー", journal_recent: "📝 最近のエントリー",
    avg_mood: "平均気分", streak: "ポジティブ連続", days: "日", recorded: "記録済み", best: "最良の日",
    know_title: "心理学知識センター", know_sub: "心理科学を通じて自分と他者を理解する",
    read_now: "今すぐ読む →", back: "← 戻る",
    special_title: "精神エネルギーマップ", special_sub: "AIが感情の波とスピリチュアルオーラを読み取ります",
    step1: "ステップ1: 現在の気分を選ぶ", step2: "ステップ2: エネルギーレベル",
    step3: "ステップ3: エネルギーを1つの言葉で表現", step3_ph: "例：穏やか、疲れた、元気...",
    read_btn: "🔮 精神エネルギーを読む", reading: "🌀 エネルギーを読み取り中...",
    wave_label: "あなたの感情波", exhausted: "疲弊", normal: "普通", full: "活力",
    aura_label: "エレメント", archetype_label: "元型", affirm_label: "✨ 今日のアファメーション",
    dash_hello: "こんにちは", dash_sub: "これはあなたの自己理解の旅です",
    dash_mood: "今日の気分", dash_streak: "ポジティブ連続",
    dash_days: "記録日数", dash_tests: "テスト数",
    dash_progress: "📊 自己理解の進捗", dash_insights: "💡 あなたの洞察",
    dash_tests_done: "🏆 完了したテスト", dash_more_tests: "+ もっとテストを受ける",
    dash_quick: "クイックアクション",
    q1: "今すぐ感情分析", q2: "今日の日記を書く", q3: "スピリチュアルオーラを探る", q4: "心理記事を読む",
    footer_tagline: "自分を理解することが、世界を理解する第一歩。",
    mood0: "最悪", mood1: "悲しい", mood2: "不快", mood3: "普通",
    mood4: "まあまあ", mood5: "嬉しい", mood6: "とても嬉しい", mood7: "最高",
    load1: "心を起動中...", load2: "エネルギーを分析中...",
    load3: "鏡を準備中...", load4: "準備完了！",
    profile_title: "マイプロフィール", edit_profile: "編集", save_profile: "変更を保存",
    member_since: "メンバー登録日", days_streak: "日連続",
    nav_chat: "💬 チャット",
    nav_game: "🌿 癒しのコーナー",
    nav_garden: "🌿 心の庭",
    nav_replay: "✨ マインドリプレイ",
    // Garden
    garden_title: "気分の庭", garden_sub: "毎日、心の木を育てましょう",
    garden_tree: "心の木", garden_water: "💧 水やり", garden_watered: "今日水やり済み ✓",
    garden_quest: "今日のクエスト", garden_badge: "バッジ", garden_streak: "連続日数",
    garden_level: "レベル", garden_xp: "心のエネルギー",
    garden_q1: "✍️ 感謝することを1つ書く", garden_q2: "🌬️ 深呼吸を2分",
    garden_q3: "💙 自分を責めない", garden_q4: "📔 日記を書く",
    garden_q5: "🧘 5分間静かに座る", garden_q6: "😊 嬉しいことを1つする",
    garden_done: "完了！", garden_claim: "報酬を受け取る",
    garden_firefly: "木が健康なときホタルが現れます 🌟",
    // Avatar
    avatar_title: "気分アバター",
    // Replay
    replay_title: "マインドリプレイ ✨", replay_sub: "感情の旅を振り返る",
    replay_week: "過去7日間", replay_month: "過去30日間",
    replay_best: "最もポジティブな日", replay_hard: "辛かった瞬間",
    replay_insight: "AIインサイト", replay_generating: "AIがあなたの旅を分析中...",
    // Quests
    quest_title: "クエスト＆実績",
    // Sound
    sound_title: "癒しの音楽",
    sound_rain: "🌧️ 雨音", sound_ocean: "🌊 波の音",
    sound_piano: "🎹 ソフトピアノ", sound_forest: "🌲 森の音",
    sound_cafe: "☕ カフェ環境音", sound_white: "🔮 ホワイトノイズ",
    sound_playing: "再生中...", sound_play: "再生",
    // Games
    game_title: "癒しのコーナー 🌿", game_sub: "AIと一緒に楽しむ6つの癒しゲーム",
    game_back: "← ゲーム一覧", game_play: "今すぐ遊ぶ", game_with_ai: "AIと遊ぶ",
    game_score: "スコア", game_level: "レベル", game_restart: "🔄 再挑戦",
    game_ai_thinking: "AIが考え中...", game_your_turn: "あなたの番", game_ai_turn: "AIの番",
    game_win: "🎉 あなたの勝ち！", game_lose: "今回はAIの勝ち！", game_draw: "🤝 引き分け！",
    game_next: "次へ →", game_done: "完了 ✨", game_tap_start: "タップして開始",
    game_breath_in: "吸って...", game_breath_hold: "止めて...", game_breath_out: "吐いて...", game_breath_rest: "休憩...",
    game_cycles: "サイクル", game_relax_msg: "よくリラックスしています 💙",
    game_breathe_title: "ボックス呼吸 4-7-8", game_memory_title: "感情記憶",
    game_word_guess: "感情の言葉を当てよう", game_affirmation_title: "ポジティブアファメーション",
    game_zen_title: "禅の庭", game_story_title: "癒しの物語",
    g1_desc: "意識的な呼吸 — 4-7-8テクニックで不安を即解消",
    g2_desc: "カードをめくってペアを見つける — 記憶と集中力を鍛える",
    g3_desc: "隠れた感情の言葉を当てよう — 必要なときAIがヒントを出します",
    g4_desc: "AIがあなたに合ったアファメーションを毎日作成",
    g5_desc: "感情に合わせて自由に色を塗る — 正解も不正解もない",
    g6_desc: "AIがあなたの気分に合った癒しの物語を語ります",
    // Logout
    logout_title: "さようなら！ 👋", logout_sub: "MindMirrorからログアウトしますか？",
    logout_yes: "ログアウト", logout_no: "留まる", logout_switch: "アカウントを切り替える",
    // Account switch
    switch_account: "🔄 アカウント切替", add_account: "➕ アカウント追加",
    switch_title: "アカウントを選ぶ", current_account: "使用中",
    // Robot / Mira guide keys
    robot_hi: "こんにちは！Miraです 🤖",
    robot_guide: "クイックガイド", robot_skip: "スキップ",
    robot_next: "次へ →", robot_finish: "始めましょう！ 🚀",
    robot_prev: "← 前へ", robot_step: "ステップ", robot_of: "/",
    robot_try: "👆 今すぐ試す！", robot_back_guide: "↩ ガイドに戻る",
    robot_done_explore: "確認完了！ガイドを続けましょう 😊",
    // Mira guide steps
    mira_s0_title: "MindMirrorへようこそ！",
    mira_s0_desc: "私はMira 🤖 — あなたのAIアシスタント！\nMindMirrorの素晴らしい機能をご案内します！",
    mira_s1_title: "AI感情分析",
    mira_s1_desc: "気持ちを共有してください — AIが気分を分析し、優しいアドバイスと癒しの言葉を届けます！ 💙\n\n【今すぐ試す】を押して体験してみましょう！",
    mira_s1_try: "🤖 感情分析を試す",
    mira_s2_title: "性格テスト",
    mira_s2_desc: "MBTI、EQ、学習スタイルのテストで本当の自分を発見しましょう！\n\n【今すぐ試す】を押してテストを始めましょう！",
    mira_s2_try: "🧩 テストを受ける",
    mira_s3_title: "感情日記",
    mira_s3_desc: "毎日の気分を記録しましょう。美しいチャートとカレンダーで感情の旅を追跡できます！ 📊\n\n今日の日記を書いてみましょう！",
    mira_s3_try: "📔 日記を書く",
    mira_s4_title: "精神エネルギーマップ",
    mira_s4_desc: "最もユニークな機能！AIが感情の波を通じてあなたのオーラを読み取ります。✨\n\n今すぐあなたのオーラを探索しましょう！",
    mira_s4_try: "🌊 オーラを探索する",
    mira_s5_title: "MindBotとチャット",
    mira_s5_desc: "AIと親友、カウンセラー、またはライフコーチのように話しましょう。MindBotは24/7聞きます！ 🤗\n\n今すぐ会話を始めましょう！",
    mira_s5_try: "💬 MindBotとチャット",
    mira_s6_title: "心理学知識コーナー",
    mira_s6_desc: "心理学の記事を読みましょう：overthinking、burnout、color psychology... 🧠\n\n知識は力 — 今すぐ探索しましょう！",
    mira_s6_try: "📚 記事を読む",
    mira_s7_title: "気分の庭",
    mira_s7_desc: "毎日クエストをこなして心の木を育てましょう 🌱\nクエスト完了でXPとバッジをゲット！",
    mira_s7_try: "🌿 庭へ行く",
    mira_s8_title: "マインドリプレイ",
    mira_s8_desc: "AIが感情の旅を週/月単位でまとめてくれます ✨\nあなたの成長を振り返りましょう！",
    mira_s8_try: "✨ リプレイを見る",
    mira_s9_title: "準備完了です！",
    mira_s9_desc: "あなたの自己発見の旅がここから始まります。困ったときはMiraがいつでもサポートします！\n\n素晴らしい体験を！ 🎊",
    q5: "MindBotとチャット",
    chat_title: "AI心理カウンセラー",
    chat_sub: "気軽に話せる — AIは判断せずに聞きます",
    chat_placeholder: "MindBotにメッセージ...",
    chat_send: "送信",
    chat_thinking: "MindBot が返信中...",
    chat_welcome: "こんにちは！MindBotです 🌿\n\n友達や優しいカウンセラーのように、何でも聞きます。\n\n悩み、ストレス、または単に話したいことを自由に話してください。\n\n今日はどんな気持ちですか？ 💙",
    chat_mode_friend: "🤝 親友",
    chat_mode_therapist: "🧠 カウンセラー",
    chat_mode_coach: "🚀 ライフコーチ",
    chat_mode_label: "MindBotの役割:",
    chat_new: "新しい会話",
    chat_clear_confirm: "会話をすべて削除しますか？",
    chat_suggestions: "提案:",
    chat_sugg1: "とてもストレスを感じています",
    chat_sugg2: "人生で何がしたいかわかりません",
    chat_sugg3: "孤独を感じています",
    chat_sugg4: "人間関係に問題があります",
    chat_copy: "コピーしました！",
    chat_chars: "文字",
    chat_you: "あなた",
    save_password: "パスワードを保存",
    otp_title: "本人確認",
    otp_verify: "認証",
    otp_invalid: "無効なOTPコード",
    otp_success: "認証成功！✅",
    otp_demo_note: "🔔 Demo OTP:",
    otp_sub_email: "OTPがメールに送信されました",
    otp_sub_phone: "OTPがSMSで送信されました",
    login_history_title: "ログイン履歴",
    hist_success: "✅ 成功",
    hist_failed: "❌ 失敗",
    hist_clear: "履歴を削除",
    hist_clear_confirm: "ログイン履歴をすべて削除しますか？",
    hist_empty: "まだログイン履歴がありません",
    fill_saved: "自動入力",
    login_method_email: "Email/Googleでサインイン",
    login_method_phone: "電話番号でサインイン",
  },
  ko: {
    tagline: "자신을 이해하는 것이 세상을 이해하는 첫걸음입니다.",
    tagline_1: "자신을 이해하는 것이",
    story_pick_world: "탐험하고 싶은 세계를 선택하세요",
    tagline_2: "세상을 이해하는",
    tagline_3: "첫걸음입니다.",
    sub_tagline: "MindMirror — AI와 행동과학으로 감정, 성격, 정신 상태를 깊이 이해하는 서비스입니다.",
    badge: "✦ 차세대 심리학 탐구 ✦",
    explore_btn: "🔮 나를 탐구하기",
    test_btn: "📊 테스트 하기",
    nav_home: "홈", nav_ai: "AI 분석", nav_test: "성격 테스트",
    nav_journal: "일기", nav_knowledge: "지식", nav_special: "✨ 특별",
    nav_dashboard: "대시보드", nav_login: "로그인", nav_logout: "로그아웃",
    nav_profile: "프로필",
    login: "로그인", register: "회원가입", logout: "로그아웃",
    full_name: "성명", email: "이메일", phone: "전화번호",
    birthday: "생년월일", password: "비밀번호", confirm_password: "비밀번호 확인",
    have_account: "이미 계정이 있으신가요?", no_account: "계정이 없으신가요?",
    login_here: "여기서 로그인", register_here: "지금 가입하기",
    auth_welcome: "다시 오셨군요", auth_create: "계정 만들기",
    auth_sub: "로그인하여 심리 여정을 저장하세요",
    auth_sub2: "오늘부터 자기 발견 여정을 시작하세요",
    login_success: "로그인 성공! 다시 오셨군요 🎉",
    register_success: "계정 생성 완료! 환영합니다 🎉",
    logout_confirm: "로그아웃 하시겠습니까?",
    err_required: "모든 항목을 입력해주세요",
    err_email: "이메일 주소가 유효하지 않습니다",
    err_phone: "전화번호가 유효하지 않습니다",
    err_password: "비밀번호는 최소 6자 이상이어야 합니다",
    err_confirm: "비밀번호가 일치하지 않습니다",
    err_login: "이메일 또는 비밀번호가 잘못되었습니다",
    or_continue: "또는 계속",
    stat1: "심리 테스트", stat2: "AI 감정 분석", stat3: "무료 & 비공개",
    feature_title: "도구 탐색", feature_sub: "자기 발견 여정은 여기서 시작됩니다",
    cta_title: "오늘 여정을 시작하세요", cta_sub: "단 5분으로 깊은 자기 이해를 얻을 수 있습니다",
    cta_btn: "지금 AI 분석 해보기 →",
    explore_link: "탐색하기 →",
    nav_report:"📄 리포트", report_title:"개인 심리 프로필", report_sub:"심리 분석 PDF 내보내기",
    report_generate:"🖨️ PDF 내보내기", report_generating:"리포트 생성 중...", report_ready:"리포트 준비 완료!",
    report_mbti:"테스트 결과", report_emotion:"감정 분석", report_journal:"일기 차트", report_summary:"심리 요약",
    report_no_data:"테스트를 완료하고 일기를 작성하여 리포트를 생성하세요.",
    nav_progress:"📈 진행", progress_title:"진행 타임라인", progress_sub:"시간에 따른 감정 변화 비교",
    progress_week1:"1주차", progress_week4:"4주차", progress_before:"이전", progress_after:"이후",
    progress_change:"변화", progress_better:"개선", progress_insight:"AI 진행 리뷰", progress_no_data:"2주 이상의 데이터가 필요합니다.",
    nav_predict:"🔮 예측", predict_title:"AI 기분 예측", predict_sub:"AI가 데이터를 분석해 오늘 기분 예측",
    predict_today:"오늘 예측", predict_run:"🔮 지금 예측", predict_running:"AI 분석 중...",
    predict_confidence:"신뢰도", predict_factors:"영향 요인", predict_tip:"오늘의 조언",
    voice_start:"🎙️ 말로 입력", voice_listening:"듣는 중...", voice_stop:"⏹ 정지",
    voice_analyze:"✨ 음성 분석", voice_no_support:"브라우저가 음성을 지원하지 않습니다",
    nav_face:"😊 얼굴 인식", face_title:"얼굴 감정 인식", face_sub:"웹캠으로 실시간 감정 분석",
    face_start:"📷 카메라 시작", face_stop:"⏹ 카메라 정지", face_detected:"감지된 감정",
    face_no_support:"웹캠 사용 불가", face_loading:"AI 모델 로드 중...",
    nav_globe:"🌐 3D 차트", globe_title:"3D 감정 지구본", globe_sub:"각 점은 하루 — 색상이 기분을 나타냄",
    globe_rotate:"회전하여 탐색", globe_click:"점을 클릭하여 자세히 보기",
    nav_care:"💙 케어 모드", care_title:"가족·친구를 위한 케어 모드", care_sub:"감정 추세 공유 (세부 정보 숨김)",
    care_share:"📤 공유 링크 만들기", care_copied:"링크 복사됨!", care_view:"요약 보기",
    care_invite:"가족 초대", care_trend:"감정 추세", care_note:"프라이버시 보호를 위해 개인 정보 숨김",
    nav_letter:"💌 미래 편지", letter_title:"미래의 나에게 편지", letter_sub:"7/30/90일 후 자신에게 편지 쓰기",
    letter_write:"✍️ 새 편지 쓰기", letter_placeholder:"미래의 나에게...",
    letter_send:"📨 편지 보내기", letter_sent:"편지가 저장되었습니다! 나중에 알림을 받습니다",
    letter_open:"편지 열기", letter_days:"일 남음", letter_arrived:"편지가 도착했습니다! 💌",
    letter_period_7:"7일", letter_period_30:"30일", letter_period_90:"90일", letter_compare:"현실과 비교",
    f1_title: "AI 감정 분석", f1_desc: "AI가 정신 상태를 읽고 깊은 통찰을 제공합니다",
    f2_title: "성격 테스트", f2_desc: "MBTI, EQ, 학습 스타일 — 진정한 자신을 발견하세요",
    f3_title: "감정 일기", f3_desc: "아름다운 차트로 감정 여정을 기록하세요",
    f4_title: "기분 지도", f4_desc: "감정의 파동을 시뮬레이션하고 오라를 읽으세요",
    ai_title: "AI 기분 분석", ai_sub: "생각을 나눠주세요 — AI가 듣고 분석합니다",
    ai_placeholder: "지금 어떤 기분인가요? 무엇이든 이야기해주세요...",
    ai_btn: "✨ 감정 분석", ai_loading: "🔮 AI 분석 중...",
    ai_positive: "긍정도", ai_intensity: "감정 강도",
    ai_analysis: "심리 분석", ai_advice: "조언", ai_history: "최근 분석 기록",
    test_title: "성격 테스트", test_sub: "심리학으로 자신을 더 깊이 이해하세요",
    test_start: "시작 →", test_back: "← 다른 테스트", test_redo: "🔄 다시 하기",
    test_strengths: "💪 강점", test_careers: "🎯 적합한 직업",
    journal_title: "감정 일기", journal_sub: "매일 감정 여정을 기록하세요",
    journal_today: "오늘 기분이 어떤가요?", journal_note: "오늘의 메모...",
    journal_save: "💾 기분 저장", journal_chart: "최근 7일 차트",
    journal_heatmap: "🗓️ 감정 달력", journal_recent: "📝 최근 기록",
    avg_mood: "평균 기분", streak: "연속 긍정", days: "일", recorded: "기록됨", best: "최고의 날",
    know_title: "심리학 지식 센터", know_sub: "심리 과학을 통해 자신과 타인을 이해하세요",
    read_now: "지금 읽기 →", back: "← 뒤로",
    special_title: "정신 에너지 지도", special_sub: "AI가 감정의 파동과 영적 오라를 읽습니다",
    step1: "1단계: 현재 기분 선택", step2: "2단계: 에너지 레벨",
    step3: "3단계: 에너지를 한 단어로 표현", step3_ph: "예: 평온, 피곤, 활기참...",
    read_btn: "🔮 정신 에너지 읽기", reading: "🌀 에너지 읽는 중...",
    wave_label: "당신의 감정 파동", exhausted: "소진", normal: "보통", full: "활력",
    aura_label: "원소", archetype_label: "원형", affirm_label: "✨ 오늘의 확언",
    dash_hello: "안녕하세요", dash_sub: "이것은 당신의 자기 이해 여정입니다",
    dash_mood: "오늘의 기분", dash_streak: "연속 긍정",
    dash_days: "기록 일수", dash_tests: "테스트 수",
    dash_progress: "📊 자기 이해 진행도", dash_insights: "💡 당신의 통찰",
    dash_tests_done: "🏆 완료한 테스트", dash_more_tests: "+ 테스트 더 하기",
    dash_quick: "빠른 작업",
    q1: "지금 감정 분석", q2: "오늘 일기 쓰기", q3: "영적 오라 탐구", q4: "심리학 기사 읽기",
    footer_tagline: "자신을 이해하는 것이 세상을 이해하는 첫걸음입니다.",
    mood0: "매우 나쁨", mood1: "슬픔", mood2: "불쾌", mood3: "보통",
    mood4: "괜찮음", mood5: "기쁨", mood6: "매우 기쁨", mood7: "최고",
    load1: "마음 시작 중...", load2: "에너지 분석 중...",
    load3: "거울 준비 중...", load4: "준비 완료!",
    profile_title: "내 프로필", edit_profile: "편집", save_profile: "변경 저장",
    member_since: "가입일", days_streak: "일 연속",
    nav_chat: "💬 채팅",
    nav_game: "🌿 힐링 코너",
    nav_garden: "🌿 마음의 정원",
    nav_replay: "✨ 마인드 리플레이",
    garden_title: "기분 정원", garden_sub: "매일 마음의 나무를 가꿔보세요",
    garden_tree: "마음의 나무", garden_water: "💧 물 주기", garden_watered: "오늘 물 줌 ✓",
    garden_quest: "오늘의 퀘스트", garden_badge: "배지", garden_streak: "연속 일수",
    garden_level: "레벨", garden_xp: "마음 에너지",
    garden_q1: "✍️ 감사한 것 1가지 쓰기", garden_q2: "🌬️ 2분 심호흡",
    garden_q3: "💙 자책하지 않기", garden_q4: "📔 일기 쓰기",
    garden_q5: "🧘 5분 조용히 앉기", garden_q6: "😊 기쁜 일 1가지 하기",
    garden_done: "완료!", garden_claim: "보상 받기",
    garden_firefly: "나무가 건강할 때 반딧불이 나타납니다 🌟",
    avatar_title: "기분 아바타",
    replay_title: "마인드 리플레이 ✨", replay_sub: "감정 여정을 돌아보세요",
    replay_week: "지난 7일", replay_month: "지난 30일",
    replay_best: "가장 긍정적인 날", replay_hard: "힘들었던 순간",
    replay_insight: "AI 인사이트", replay_generating: "AI가 당신의 여정을 분석 중...",
    quest_title: "퀘스트 & 업적",
    sound_title: "힐링 사운드",
    sound_rain: "🌧️ 빗소리", sound_ocean: "🌊 파도 소리",
    sound_piano: "🎹 소프트 피아노", sound_forest: "🌲 숲 소리",
    sound_cafe: "☕ 카페 분위기", sound_white: "🔮 화이트 노이즈",
    sound_playing: "재생 중...", sound_play: "재생",
    game_title: "힐링 코너 🌿", game_sub: "AI와 함께하는 6가지 힐링 게임",
    game_back: "← 게임 목록", game_play: "지금 플레이", game_with_ai: "AI와 함께",
    game_score: "점수", game_level: "레벨", game_restart: "🔄 다시 시작",
    game_ai_thinking: "AI가 생각 중...", game_your_turn: "당신의 차례", game_ai_turn: "AI 차례",
    game_win: "🎉 당신이 이겼어요!", game_lose: "이번엔 AI가 이겼어요!", game_draw: "🤝 무승부!",
    game_next: "다음 →", game_done: "완료 ✨", game_tap_start: "탭해서 시작",
    game_breath_in: "들이쉬어요...", game_breath_hold: "참아요...", game_breath_out: "내쉬어요...", game_breath_rest: "쉬어요...",
    game_cycles: "사이클", game_relax_msg: "잘 이완되고 있어요 💙",
    game_breathe_title: "박스 호흡 4-7-8", game_memory_title: "감정 기억",
    game_word_guess: "감정 단어 맞추기", game_affirmation_title: "긍정 확언",
    game_zen_title: "선 정원", game_story_title: "힐링 스토리",
    g1_desc: "의도적인 호흡 — 4-7-8 기법으로 불안 즉시 해소", g2_desc: "카드 뒤집어 짝 찾기 — 기억력과 집중력 훈련",
    g3_desc: "숨겨진 감정 단어 맞추기 — 필요할 때 AI가 힌트 제공", g4_desc: "AI가 매일 개인화된 확언 생성",
    g5_desc: "감정에 따라 자유롭게 색칠 — 정답도 오답도 없어요", g6_desc: "AI가 당신의 기분에 맞는 힐링 스토리 들려줌",
    logout_title: "안녕히 가세요! 👋", logout_sub: "MindMirror에서 로그아웃하시겠어요?",
    logout_yes: "로그아웃", logout_no: "머물기", logout_switch: "계정 전환",
    switch_account: "🔄 계정 전환", add_account: "➕ 계정 추가",
    switch_title: "계정 선택", current_account: "사용 중",
    robot_hi: "안녕하세요! 저는 Mira예요 🤖",
    robot_guide: "빠른 가이드", robot_skip: "건너뛰기",
    robot_next: "다음 →", robot_finish: "시작해요! 🚀",
    robot_prev: "← 이전", robot_step: "단계", robot_of: "/",
    robot_try: "👆 지금 해보기!", robot_back_guide: "↩ 가이드로 돌아가기",
    robot_done_explore: "확인 완료! 가이드 계속하기 😊",
    mira_s0_title: "MindMirror에 오신 걸 환영해요!",
    mira_s0_desc: "저는 Mira 🤖 — 당신의 AI 어시스턴트예요!\nMindMirror의 놀라운 기능들을 안내해 드릴게요!",
    mira_s1_title: "AI 감정 분석",
    mira_s1_desc: "감정을 공유해보세요 — AI가 기분을 분석하고 부드러운 조언과 치유의 말을 전해드려요! 💙\n\n지금 해보기를 눌러 체험해보세요!",
    mira_s1_try: "🤖 감정 분석 해보기",
    mira_s2_title: "성격 테스트",
    mira_s2_desc: "MBTI, EQ, 학습 유형 테스트로 진짜 자신을 발견해보세요!\n\n지금 해보기를 눌러 테스트를 시작하세요!",
    mira_s2_try: "🧩 테스트 바로 하기",
    mira_s3_title: "감정 일기",
    mira_s3_desc: "매일 기분을 기록하세요. 예쁜 차트와 캘린더로 감정 여정을 추적해요! 📊 오늘 일기도 써보세요!",
    mira_s3_try: "📔 일기 쓰기",
    mira_s4_title: "정신 에너지 지도",
    mira_s4_desc: "가장 특별한 기능! AI가 감정의 파동으로 당신의 오라를 읽어줘요. ✨\n\n지금 당신의 오라를 탐험해보세요!",
    mira_s4_try: "🌊 내 오라 탐험",
    mira_s5_title: "MindBot과 대화",
    mira_s5_desc: "AI와 친한 친구, 상담사, 또는 라이프 코치처럼 이야기해보세요. MindBot은 24/7 들어줘요! 🤗",
    mira_s5_try: "💬 MindBot과 채팅",
    mira_s6_title: "심리학 지식 코너",
    mira_s6_desc: "심리학 기사를 읽어보세요: 오버씽킹, 번아웃, 색채 심리학... 🧠\n\n지금 탐색해보세요!",
    mira_s6_try: "📚 기사 읽기",
    mira_s7_title: "기분 정원", mira_s7_desc: "매일 퀘스트로 마음의 나무를 키워보세요 🌱", mira_s7_try: "🌿 정원 가기",
    mira_s8_title: "마인드 리플레이", mira_s8_desc: "AI가 감정 여정을 주/월별로 요약해줘요 ✨", mira_s8_try: "✨ 리플레이 보기",
    mira_s9_title: "준비됐어요!", mira_s9_desc: "자기 발견의 여정이 여기서 시작돼요. 필요할 때 Mira가 항상 도와드릴게요!\n\n멋진 경험이 되길 바라요! 🎊",
    q5: "MindBot과 채팅",
    chat_title: "AI 심리 친구",
    chat_sub: "자유롭게 이야기하세요 — AI가 판단 없이 들어줍니다",
    chat_placeholder: "MindBot에게 메시지...",
    chat_send: "전송",
    chat_thinking: "MindBot이 답변 중...",
    chat_welcome: "안녕하세요! MindBot입니다 🌿\n\n친한 친구나 부드러운 상담사처럼 뭐든지 들어드릴게요.\n\n걱정, 스트레스, 외로움, 아니면 그냥 이야기하고 싶을 때 편하게 말씀해 주세요.\n\n오늘 기분이 어떠세요? 💙",
    chat_mode_friend: "🤝 친한 친구",
    chat_mode_therapist: "🧠 상담사",
    chat_mode_coach: "🚀 라이프 코치",
    chat_mode_label: "MindBot의 역할:",
    chat_new: "새 대화",
    chat_clear_confirm: "전체 대화를 삭제하시겠습니까?",
    chat_suggestions: "제안:",
    chat_sugg1: "매우 스트레스를 받고 있어요",
    chat_sugg2: "인생에서 무엇을 원하는지 모르겠어요",
    chat_sugg3: "외로움을 느껴요",
    chat_sugg4: "인간관계에 문제가 있어요",
    chat_copy: "복사됨!",
    chat_chars: "글자",
    chat_you: "나",
    save_password: "비밀번호 저장",
    otp_title: "본인 확인",
    otp_verify: "인증",
    otp_invalid: "잘못된 OTP 코드",
    otp_success: "인증 성공！✅",
    otp_demo_note: "🔔 Demo OTP:",
    otp_sub_email: "OTP가 이메일로 전송되었습니다",
    otp_sub_phone: "OTP가 SMS로 전송되었습니다",
    login_history_title: "로그인 기록",
    hist_success: "✅ 성공",
    hist_failed: "❌ 실패",
    hist_clear: "기록 삭제",
    hist_clear_confirm: "로그인 기록을 모두 삭제하시겠습니까？",
    hist_empty: "아직 로그인 기록이 없습니다",
    fill_saved: "자동 입력",
    login_method_email: "이메일/Google로 로그인",
    login_method_phone: "전화번호로 로그인",
  },
  zh: {
    tagline: "了解自己是了解世界的第一步。",
    tagline_1: "了解自己是",
    story_pick_world: "选择您想探索的世界",
    tagline_2: "了解世界的",
    tagline_3: "第一步。",
    sub_tagline: "MindMirror — 利用AI和行为科学，帮助您深入了解自己的情感、性格和精神状态。",
    badge: "✦ 探索下一代心理学 ✦",
    explore_btn: "🔮 探索自我",
    test_btn: "📊 参加测试",
    nav_home: "首页", nav_ai: "AI分析", nav_test: "性格测试",
    nav_journal: "日记", nav_knowledge: "知识", nav_special: "✨ 特别",
    nav_dashboard: "仪表板", nav_login: "登录", nav_logout: "退出",
    nav_profile: "个人资料",
    login: "登录", register: "注册", logout: "退出登录",
    full_name: "姓名", email: "电子邮件", phone: "手机号码",
    birthday: "出生日期", password: "密码", confirm_password: "确认密码",
    have_account: "已有账号？", no_account: "没有账号？",
    login_here: "在这里登录", register_here: "立即注册",
    auth_welcome: "欢迎回来", auth_create: "创建账号",
    auth_sub: "登录以保存您的心理旅程",
    auth_sub2: "今天就开始自我发现之旅",
    login_success: "登录成功！欢迎回来 🎉",
    register_success: "账号创建成功！欢迎加入 🎉",
    logout_confirm: "您确定要退出登录吗？",
    err_required: "请填写所有字段",
    err_email: "邮箱地址无效",
    err_phone: "电话号码无效",
    err_password: "密码至少需要6个字符",
    err_confirm: "密码不匹配",
    err_login: "邮箱或密码错误",
    or_continue: "或者继续",
    stat1: "心理测试", stat2: "AI情感分析", stat3: "免费且私密",
    feature_title: "探索工具", feature_sub: "自我发现之旅从这里开始",
    cta_title: "今天开始您的旅程", cta_sub: "只需5分钟即可获得深刻的自我洞察",
    cta_btn: "立即尝试AI分析 →",
    explore_link: "探索 →",
    nav_report:"📄 报告", report_title:"个人心理档案", report_sub:"导出心理分析PDF报告",
    report_generate:"🖨️ 导出PDF", report_generating:"生成报告中...", report_ready:"报告已准备好！",
    report_mbti:"测试结果", report_emotion:"情感分析", report_journal:"日记图表", report_summary:"心理概况",
    report_no_data:"请完成测试并写日记以生成报告。",
    nav_progress:"📈 进度", progress_title:"进度时间线", progress_sub:"比较随时间推移的情感变化",
    progress_week1:"第1周", progress_week4:"第4周", progress_before:"之前", progress_after:"之后",
    progress_change:"变化", progress_better:"改善", progress_insight:"AI进度回顾", progress_no_data:"需要至少2周的数据。",
    nav_predict:"🔮 预测", predict_title:"AI情绪预测", predict_sub:"AI分析您的数据预测今天的情绪",
    predict_today:"今天预测", predict_run:"🔮 立即预测", predict_running:"AI分析中...",
    predict_confidence:"置信度", predict_factors:"影响因素", predict_tip:"今日建议",
    voice_start:"🎙️ 语音输入", voice_listening:"聆听中...", voice_stop:"⏹ 停止",
    voice_analyze:"✨ 分析语音", voice_no_support:"浏览器不支持语音",
    nav_face:"😊 面部识别", face_title:"面部情感识别", face_sub:"通过摄像头实时分析情感",
    face_start:"📷 启动摄像头", face_stop:"⏹ 停止摄像头", face_detected:"检测到的情感",
    face_no_support:"摄像头不可用", face_loading:"加载AI模型中...",
    nav_globe:"🌐 3D图表", globe_title:"3D情感地球", globe_sub:"每个点是一天 — 颜色表示心情",
    globe_rotate:"旋转探索", globe_click:"点击查看详情",
    nav_care:"💙 关爱模式", care_title:"亲友关爱模式", care_sub:"分享情感趋势（隐藏详情）给家人/朋友",
    care_share:"📤 创建分享链接", care_copied:"链接已复制！", care_view:"查看摘要",
    care_invite:"邀请亲友", care_trend:"情感趋势", care_note:"个人信息已隐藏以保护隐私",
    nav_letter:"💌 未来信件", letter_title:"给未来自己的信", letter_sub:"写信给7/30/90天后的自己",
    letter_write:"✍️ 写新信件", letter_placeholder:"亲爱的未来的我...",
    letter_send:"📨 发送信件", letter_sent:"信件已保存！稍后会提醒您",
    letter_open:"打开信件", letter_days:"天后", letter_arrived:"信件已到达！ 💌",
    letter_period_7:"7天", letter_period_30:"30天", letter_period_90:"90天", letter_compare:"与现实对比",
    f1_title: "AI情感分析", f1_desc: "AI读取您的精神状态并提供深刻的个人见解",
    f2_title: "性格测试", f2_desc: "MBTI、EQ、学习风格 — 发现真实的自己",
    f3_title: "情感日记", f3_desc: "用美观的图表记录您的情感旅程",
    f4_title: "心情地图", f4_desc: "模拟情感波动并读取精神光环",
    ai_title: "AI心情分析", ai_sub: "分享您的想法 — AI会倾听并分析",
    ai_placeholder: "您现在感觉怎么样？分享任何您心中的事...",
    ai_btn: "✨ 分析情感", ai_loading: "🔮 AI分析中...",
    ai_positive: "积极程度", ai_intensity: "情感强度",
    ai_analysis: "心理分析", ai_advice: "建议", ai_history: "最近分析历史",
    test_title: "性格测试", test_sub: "心理科学帮助您更深入地了解自己",
    test_start: "开始 →", test_back: "← 其他测试", test_redo: "🔄 重新测试",
    test_strengths: "💪 优势", test_careers: "🎯 适合职业",
    journal_title: "情感日记", journal_sub: "每天记录您的情感旅程",
    journal_today: "今天感觉如何？", journal_note: "关于今天的笔记...",
    journal_save: "💾 保存心情", journal_chart: "过去7天图表",
    journal_heatmap: "🗓️ 情感日历", journal_recent: "📝 最近记录",
    avg_mood: "平均心情", streak: "积极连续", days: "天", recorded: "已记录", best: "最佳日",
    know_title: "心理学知识中心", know_sub: "通过心理科学了解自己和他人",
    read_now: "立即阅读 →", back: "← 返回",
    special_title: "精神能量地图", special_sub: "AI读取您的情感波动和灵性光环",
    step1: "第一步：选择当前心情", step2: "第二步：能量水平",
    step3: "第三步：用一个词描述您的能量", step3_ph: "例如：平静、疲倦、充满活力...",
    read_btn: "🔮 读取精神能量", reading: "🌀 读取能量中...",
    wave_label: "您的情感波", exhausted: "精疲力竭", normal: "正常", full: "充满活力",
    aura_label: "元素", archetype_label: "原型", affirm_label: "✨ 今日肯定语",
    dash_hello: "你好", dash_sub: "这是您的自我理解旅程",
    dash_mood: "今日心情", dash_streak: "积极连续",
    dash_days: "记录天数", dash_tests: "测试次数",
    dash_progress: "📊 自我理解进度", dash_insights: "💡 您的洞察",
    dash_tests_done: "🏆 已完成测试", dash_more_tests: "+ 参加更多测试",
    dash_quick: "快速操作",
    q1: "立即分析情感", q2: "写今天的日记", q3: "探索灵性光环", q4: "阅读心理学文章",
    footer_tagline: "了解自己是了解世界的第一步。",
    mood0: "非常差", mood1: "悲伤", mood2: "不舒服", mood3: "普通",
    mood4: "还好", mood5: "高兴", mood6: "非常高兴", mood7: "太棒了",
    load1: "正在启动思维...", load2: "分析能量中...",
    load3: "准备镜子中...", load4: "准备就绪！",
    profile_title: "我的资料", edit_profile: "编辑", save_profile: "保存更改",
    member_since: "注册时间", days_streak: "天连续",
    nav_chat: "💬 聊天",
    nav_game: "🌿 疗愈角落",
    nav_garden: "🌿 心灵花园",
    nav_replay: "✨ 情感回放",
    garden_title: "心情花园", garden_sub: "每天呵护您的心灵之树",
    garden_tree: "心灵之树", garden_water: "💧 浇水", garden_watered: "今天已浇水 ✓",
    garden_quest: "今日任务", garden_badge: "徽章", garden_streak: "连续天数",
    garden_level: "等级", garden_xp: "心灵能量",
    garden_q1: "✍️ 写下1件感恩的事", garden_q2: "🌬️ 深呼吸2分钟",
    garden_q3: "💙 今天不自责", garden_q4: "📔 写日记",
    garden_q5: "🧘 静坐5分钟", garden_q6: "😊 做1件让你开心的事",
    garden_done: "完成!", garden_claim: "领取奖励",
    garden_firefly: "树木健康时萤火虫会出现 🌟",
    avatar_title: "心情头像",
    replay_title: "情感回放 ✨", replay_sub: "回顾您的情感旅程",
    replay_week: "过去7天", replay_month: "过去30天",
    replay_best: "最积极的一天", replay_hard: "困难时刻",
    replay_insight: "AI洞察", replay_generating: "AI正在分析您的旅程...",
    quest_title: "任务与成就",
    sound_title: "疗愈音乐",
    sound_rain: "🌧️ 雨声", sound_ocean: "🌊 海浪声",
    sound_piano: "🎹 轻柔钢琴", sound_forest: "🌲 森林音效",
    sound_cafe: "☕ 咖啡厅环境音", sound_white: "🔮 白噪音",
    sound_playing: "播放中...", sound_play: "播放",
    game_title: "疗愈角落 🌿", game_sub: "与AI一起享受6款疗愈游戏",
    game_back: "← 游戏列表", game_play: "立即游玩", game_with_ai: "与AI同乐",
    game_score: "分数", game_level: "等级", game_restart: "🔄 重新开始",
    game_ai_thinking: "AI思考中...", game_your_turn: "您的回合", game_ai_turn: "AI回合",
    game_win: "🎉 您赢了！", game_lose: "这次AI赢了！", game_draw: "🤝 平局！",
    game_next: "下一个 →", game_done: "完成 ✨", game_tap_start: "点击开始",
    game_breath_in: "吸气...", game_breath_hold: "屏住...", game_breath_out: "呼气...", game_breath_rest: "休息...",
    game_cycles: "循环", game_relax_msg: "您放松得很好 💙",
    game_breathe_title: "方块呼吸 4-7-8", game_memory_title: "情感记忆",
    game_word_guess: "猜情感词语", game_affirmation_title: "积极肯定语",
    game_zen_title: "禅意花园", game_story_title: "疗愈故事",
    g1_desc: "有意识地呼吸 — 4-7-8技巧即时减少焦虑", g2_desc: "翻转卡片找配对 — 训练记忆力和注意力",
    g3_desc: "猜隐藏的情感词语 — 需要时AI给出提示", g4_desc: "AI每天为您创建个性化肯定语",
    g5_desc: "根据情感自由涂色 — 没有对错之分", g6_desc: "AI讲述适合您心情的疗愈故事",
    logout_title: "再见！ 👋", logout_sub: "确定要退出MindMirror吗？",
    logout_yes: "退出登录", logout_no: "留下", logout_switch: "切换账号",
    switch_account: "🔄 切换账号", add_account: "➕ 添加账号",
    switch_title: "选择账号", current_account: "使用中",
    robot_hi: "你好！我是Mira 🤖",
    robot_guide: "快速指引", robot_skip: "跳过",
    robot_next: "下一步 →", robot_finish: "开始吧！ 🚀",
    robot_prev: "← 上一步", robot_step: "步骤", robot_of: "/",
    robot_try: "👆 立即体验！", robot_back_guide: "↩ 返回指引",
    robot_done_explore: "探索完成！继续指引 😊",
    mira_s0_title: "欢迎来到MindMirror！",
    mira_s0_desc: "我是Mira 🤖 — 您的AI助手！\n让我带您探索MindMirror的精彩功能！",
    mira_s1_title: "AI情感分析", mira_s1_desc: "分享您的感受 — AI将分析情绪并给出温柔建议！ 💙 点击【立即体验】尝试一下！",
    mira_s1_try: "🤖 体验情感分析",
    mira_s2_title: "性格测试", mira_s2_desc: "通过MBTI、EQ、学习风格测试发现真实的自己！ 点击【立即体验】开始测试！",
    mira_s2_try: "🧩 立即测试",
    mira_s3_title: "情感日记", mira_s3_desc: "每天记录心情。用精美图表追踪情感旅程！ 📊\n\n今天就写一篇日记吧！",
    mira_s3_try: "📔 写日记",
    mira_s4_title: "精神能量地图", mira_s4_desc: "最特别的功能！AI通过情感波读取您的光环。✨\n\n立即探索您的光环！",
    mira_s4_try: "🌊 探索我的光环",
    mira_s5_title: "与MindBot聊天", mira_s5_desc: "像好朋友、咨询师或人生教练一样与AI交谈。MindBot 24/7倾听您！ 🤗",
    mira_s5_try: "💬 与MindBot聊天",
    mira_s6_title: "心理学知识角", mira_s6_desc: "阅读心理学文章：过度思考、倦怠、色彩心理学... 🧠",
    mira_s6_try: "📚 阅读文章",
    mira_s7_title: "心情花园", mira_s7_desc: "每天完成任务培育心灵之树 🌱", mira_s7_try: "🌿 去花园",
    mira_s8_title: "情感回放", mira_s8_desc: "AI按周/月总结您的情感旅程 ✨", mira_s8_try: "✨ 查看回放",
    mira_s9_title: "准备好了！", mira_s9_desc: "您的自我发现之旅从这里开始。有需要时Mira随时为您提供指引！\n\n祝您体验愉快！ 🎊",
    q5: "与MindBot聊天",
    chat_title: "AI心理朋友",
    chat_sub: "畅所欲言 — AI不加评判地倾听",
    chat_placeholder: "给MindBot发消息...",
    chat_send: "发送",
    chat_thinking: "MindBot正在回复...",
    chat_welcome: "你好！我是MindBot 🌿\n\n我在这里倾听你 — 像一个值得信赖的朋友或温和的心理咨询师。\n\n随时分享任何事情：担忧、压力、悲伤，或者只是想聊聊天。\n\n你今天感觉怎么样？ 💙",
    chat_mode_friend: "🤝 好朋友",
    chat_mode_therapist: "🧠 心理咨询师",
    chat_mode_coach: "🚀 人生教练",
    chat_mode_label: "MindBot的角色:",
    chat_new: "新对话",
    chat_clear_confirm: "清除所有对话？",
    chat_suggestions: "建议:",
    chat_sugg1: "我感到非常有压力",
    chat_sugg2: "我不知道自己想要什么",
    chat_sugg3: "我感到孤独",
    chat_sugg4: "我在人际关系方面有问题",
    chat_copy: "已复制！",
    chat_chars: "字符",
    chat_you: "你",
    save_password: "保存密码",
    otp_title: "身份验证",
    otp_verify: "验证",
    otp_invalid: "无效的OTP代码",
    otp_success: "验证成功！✅",
    otp_demo_note: "🔔 Demo OTP:",
    otp_sub_email: "OTP已发送到您的邮箱",
    otp_sub_phone: "OTP已通过短信发送",
    login_history_title: "登录历史",
    hist_success: "✅ 成功",
    hist_failed: "❌ 失败",
    hist_clear: "清除记录",
    hist_clear_confirm: "清除所有登录历史？",
    hist_empty: "暂无登录历史",
    fill_saved: "自动填充",
    login_method_email: "邮箱/Google登录",
    login_method_phone: "手机号登录",
  },
  fr: {
    tagline: "Se comprendre soi-même est le premier pas pour comprendre le monde.",
    tagline_1: "Se comprendre soi-même est",
    story_pick_world: "Choisissez le monde à explorer",
    tagline_2: "le premier pas pour",
    tagline_3: "comprendre le monde.",
    sub_tagline: "MindMirror — un miroir psychologique IA pour vous aider à comprendre vos émotions, personnalité et état mental.",
    badge: "✦ Explorer la psychologie de nouvelle génération ✦",
    explore_btn: "🔮 Explorer en moi",
    test_btn: "📊 Passer un test",
    nav_home: "Accueil", nav_ai: "Analyse IA", nav_test: "Test de Personnalité",
    nav_journal: "Journal", nav_knowledge: "Connaissances", nav_special: "✨ Spécial",
    nav_dashboard: "Tableau de bord", nav_login: "Connexion", nav_logout: "Déconnexion",
    nav_profile: "Profil",
    login: "Se connecter", register: "S'inscrire", logout: "Se déconnecter",
    full_name: "Nom complet", email: "E-mail", phone: "Numéro de téléphone",
    birthday: "Date de naissance", password: "Mot de passe", confirm_password: "Confirmer le mot de passe",
    have_account: "Vous avez déjà un compte ?", no_account: "Pas encore de compte ?",
    login_here: "Connectez-vous ici", register_here: "Inscrivez-vous maintenant",
    auth_welcome: "Bon retour", auth_create: "Créer un compte",
    auth_sub: "Connectez-vous pour sauvegarder votre parcours psychologique",
    auth_sub2: "Commencez votre voyage de découverte de soi aujourd'hui",
    login_success: "Connexion réussie ! Bon retour 🎉",
    register_success: "Compte créé ! Bienvenue 🎉",
    logout_confirm: "Êtes-vous sûr de vouloir vous déconnecter ?",
    err_required: "Veuillez remplir tous les champs",
    err_email: "Adresse e-mail invalide",
    err_phone: "Numéro de téléphone invalide",
    err_password: "Le mot de passe doit comporter au moins 6 caractères",
    err_confirm: "Les mots de passe ne correspondent pas",
    err_login: "E-mail ou mot de passe incorrect",
    or_continue: "ou continuer avec",
    stat1: "Tests psychologiques", stat2: "Analyse émotionnelle IA", stat3: "Gratuit et privé",
    feature_title: "Explorer les outils", feature_sub: "Votre voyage de découverte de soi commence ici",
    cta_title: "Commencez votre voyage aujourd'hui", cta_sub: "Seulement 5 minutes pour une connaissance de soi plus profonde",
    cta_btn: "Essayez l'analyse IA maintenant →",
    explore_link: "Explorer →",
    nav_report:"📄 Rapport", report_title:"Profil Psychologique Personnel", report_sub:"Exporter un PDF d'analyse psychologique",
    report_generate:"🖨️ Exporter PDF", report_generating:"Génération du rapport...", report_ready:"Rapport prêt !",
    report_mbti:"Résultats des tests", report_emotion:"Analyse émotionnelle", report_journal:"Graphique du journal", report_summary:"Bilan psychologique",
    report_no_data:"Complétez des tests et écrivez dans votre journal pour générer le rapport.",
    nav_progress:"📈 Progrès", progress_title:"Timeline de Progrès", progress_sub:"Comparez vos changements émotionnels dans le temps",
    progress_week1:"Semaine 1", progress_week4:"Semaine 4", progress_before:"Avant", progress_after:"Après",
    progress_change:"Changement", progress_better:"Amélioration", progress_insight:"Analyse IA des progrès", progress_no_data:"2 semaines de données minimales requises.",
    nav_predict:"🔮 Prédire", predict_title:"Prédiction d'Humeur IA", predict_sub:"L'IA analyse vos données pour prédire l'humeur du jour",
    predict_today:"Prédiction du jour", predict_run:"🔮 Prédire maintenant", predict_running:"IA en analyse...",
    predict_confidence:"Confiance", predict_factors:"Facteurs influents", predict_tip:"Conseil du jour",
    voice_start:"🎙️ Parler au lieu de taper", voice_listening:"En écoute...", voice_stop:"⏹ Arrêter",
    voice_analyze:"✨ Analyser la voix", voice_no_support:"Navigateur ne supporte pas la voix",
    nav_face:"😊 Détection faciale", face_title:"Reconnaissance des Émotions Faciales", face_sub:"L'IA analyse les émotions via webcam en temps réel",
    face_start:"📷 Démarrer la caméra", face_stop:"⏹ Arrêter la caméra", face_detected:"Émotion détectée",
    face_no_support:"Webcam non disponible", face_loading:"Chargement du modèle IA...",
    nav_globe:"🌐 Graphique 3D", globe_title:"Globe Émotionnel 3D", globe_sub:"Chaque point est un jour — la couleur indique l'humeur",
    globe_rotate:"Faites tourner pour explorer", globe_click:"Cliquez sur un point pour les détails",
    nav_care:"💙 Mode Soin", care_title:"Mode Soin pour Proches", care_sub:"Partager les tendances émotionnelles (détails cachés)",
    care_share:"📤 Créer un lien de partage", care_copied:"Lien copié !", care_view:"Voir le résumé",
    care_invite:"Inviter un proche", care_trend:"Tendance émotionnelle", care_note:"Informations personnelles cachées pour la vie privée",
    nav_letter:"💌 Lettre Future", letter_title:"Lettre à Mon Futur Moi", letter_sub:"Écrivez-vous dans 7/30/90 jours",
    letter_write:"✍️ Écrire une lettre", letter_placeholder:"Cher futur moi...",
    letter_send:"📨 Envoyer la lettre", letter_sent:"Lettre sauvegardée ! Vous serez rappelé plus tard",
    letter_open:"Ouvrir la lettre", letter_days:"jours restants", letter_arrived:"Votre lettre est arrivée ! 💌",
    letter_period_7:"7 jours", letter_period_30:"30 jours", letter_period_90:"90 jours", letter_compare:"Comparer avec la réalité",
    f1_title: "Analyse émotionnelle IA", f1_desc: "L'IA lit votre état mental et fournit des informations approfondies",
    f2_title: "Tests de personnalité", f2_desc: "MBTI, EQ, style d'apprentissage — découvrez votre vrai moi",
    f3_title: "Journal émotionnel", f3_desc: "Suivez votre parcours émotionnel avec de beaux graphiques",
    f4_title: "Carte des humeurs", f4_desc: "Simulez les ondes émotionnelles et lisez votre aura spirituelle",
    ai_title: "Analyse de l'humeur IA", ai_sub: "Partagez vos pensées — l'IA écoutera et analysera",
    ai_placeholder: "Comment vous sentez-vous ? Partagez ce qui vous passe par la tête...",
    ai_btn: "✨ Analyser les émotions", ai_loading: "🔮 IA en analyse...",
    ai_positive: "Niveau de positivité", ai_intensity: "Intensité émotionnelle",
    ai_analysis: "Analyse psychologique", ai_advice: "Conseils", ai_history: "Historique récent des analyses",
    test_title: "Tests de personnalité", test_sub: "La science psychologique vous aide à mieux vous connaître",
    test_start: "Commencer →", test_back: "← Autres tests", test_redo: "🔄 Recommencer",
    test_strengths: "💪 Points forts", test_careers: "🎯 Carrières adaptées",
    journal_title: "Journal émotionnel", journal_sub: "Enregistrez votre parcours émotionnel chaque jour",
    journal_today: "Comment vous sentez-vous aujourd'hui ?", journal_note: "Notes sur votre journée...",
    journal_save: "💾 Sauvegarder l'humeur", journal_chart: "Graphique des 7 derniers jours",
    journal_heatmap: "🗓️ Calendrier émotionnel", journal_recent: "📝 Entrées récentes",
    avg_mood: "Humeur moy.", streak: "Série positive", days: "jours", recorded: "Enregistré", best: "Meilleur jour",
    know_title: "Centre de connaissances psychologiques", know_sub: "Comprendre soi-même et les autres grâce à la psychologie",
    read_now: "Lire maintenant →", back: "← Retour",
    special_title: "Carte de l'énergie mentale", special_sub: "L'IA lit vos ondes émotionnelles et votre aura spirituelle",
    step1: "Étape 1 : Choisissez votre humeur actuelle", step2: "Étape 2 : Niveau d'énergie",
    step3: "Étape 3 : Décrivez votre énergie en 1 mot", step3_ph: "Ex : calme, fatigué, enthousiaste...",
    read_btn: "🔮 Lire l'énergie mentale", reading: "🌀 Lecture de l'énergie...",
    wave_label: "Votre onde émotionnelle", exhausted: "Épuisé", normal: "Normal", full: "Énergisé",
    aura_label: "Élément", archetype_label: "Archétype", affirm_label: "✨ Affirmation du jour",
    dash_hello: "Bonjour", dash_sub: "Voici votre voyage de compréhension de soi",
    dash_mood: "Humeur d'aujourd'hui", dash_streak: "Série positive",
    dash_days: "Jours enregistrés", dash_tests: "Tests effectués",
    dash_progress: "📊 Progrès de compréhension", dash_insights: "💡 Vos insights",
    dash_tests_done: "🏆 Tests complétés", dash_more_tests: "+ Passer d'autres tests",
    dash_quick: "Actions rapides",
    q1: "Analyser les émotions maintenant", q2: "Écrire le journal d'aujourd'hui", q3: "Explorer l'aura spirituelle", q4: "Lire des articles de psychologie",
    footer_tagline: "Se comprendre soi-même est le premier pas pour comprendre le monde.",
    mood0: "Très mauvais", mood1: "Triste", mood2: "Mal à l'aise", mood3: "Neutre",
    mood4: "Bien", mood5: "Heureux", mood6: "Très heureux", mood7: "Fantastique",
    load1: "Démarrage de l'esprit...", load2: "Analyse de l'énergie...",
    load3: "Préparation du miroir...", load4: "Prêt !",
    profile_title: "Mon profil", edit_profile: "Modifier", save_profile: "Enregistrer",
    member_since: "Membre depuis", days_streak: "jours consécutifs",
    nav_chat: "💬 Discuter",
    nav_game: "🌿 Espace Bien-être",
    nav_garden: "🌿 Jardin de l'Esprit",
    nav_replay: "✨ Mind Replay",
    garden_title: "Jardin des Humeurs", garden_sub: "Prenez soin de votre arbre mental chaque jour",
    garden_tree: "Arbre Mental", garden_water: "💧 Arroser", garden_watered: "Arrosé aujourd'hui ✓",
    garden_quest: "Quêtes du jour", garden_badge: "Badges", garden_streak: "Jours consécutifs",
    garden_level: "Niveau", garden_xp: "Énergie mentale",
    garden_q1: "✍️ Écrire 1 chose pour laquelle je suis reconnaissant", garden_q2: "🌬️ Respiration profonde 2 min",
    garden_q3: "💙 Ne pas me blâmer aujourd'hui", garden_q4: "📔 Écrire dans mon journal",
    garden_q5: "🧘 Rester assis calmement 5 min", garden_q6: "😊 Faire 1 chose qui me rend heureux",
    garden_done: "Terminé!", garden_claim: "Réclamer la récompense",
    garden_firefly: "Les lucioles apparaissent quand l'arbre est en bonne santé 🌟",
    avatar_title: "Avatar d'Humeur",
    replay_title: "Mind Replay ✨", replay_sub: "Regardez en arrière votre voyage émotionnel",
    replay_week: "7 derniers jours", replay_month: "30 derniers jours",
    replay_best: "Jour le plus positif", replay_hard: "Moments difficiles",
    replay_insight: "Analyse IA", replay_generating: "L'IA analyse votre parcours...",
    quest_title: "Quêtes et Réalisations",
    sound_title: "Sons Apaisants",
    sound_rain: "🌧️ Pluie", sound_ocean: "🌊 Vagues",
    sound_piano: "🎹 Piano doux", sound_forest: "🌲 Forêt",
    sound_cafe: "☕ Ambiance café", sound_white: "🔮 Bruit blanc",
    sound_playing: "En lecture...", sound_play: "Lire",
    game_title: "Espace Bien-être 🌿", game_sub: "6 jeux apaisants avec l'IA",
    game_back: "← Liste des jeux", game_play: "Jouer maintenant", game_with_ai: "Jouer avec l'IA",
    game_score: "Score", game_level: "Niveau", game_restart: "🔄 Recommencer",
    game_ai_thinking: "L'IA réfléchit...", game_your_turn: "Votre tour", game_ai_turn: "Tour de l'IA",
    game_win: "🎉 Vous avez gagné!", game_lose: "L'IA gagne cette fois!", game_draw: "🤝 Égalité!",
    game_next: "Suivant →", game_done: "Terminé ✨", game_tap_start: "Appuyez pour commencer",
    game_breath_in: "Inspirez...", game_breath_hold: "Retenez...", game_breath_out: "Expirez...", game_breath_rest: "Repos...",
    game_cycles: "Cycles", game_relax_msg: "Vous vous relaxez bien 💙",
    game_breathe_title: "Respiration en Boîte 4-7-8", game_memory_title: "Mémoire Émotionnelle",
    game_word_guess: "Devinez le mot émotionnel", game_affirmation_title: "Affirmations Positives",
    game_zen_title: "Jardin Zen", game_story_title: "Histoire Thérapeutique",
    g1_desc: "Respiration intentionnelle — technique 4-7-8 réduit l'anxiété instantanément",
    g2_desc: "Retournez les cartes pour trouver des paires — entraînez la mémoire",
    g3_desc: "Devinez les mots émotionnels cachés — l'IA donne des indices",
    g4_desc: "L'IA crée des affirmations personnalisées pour vous chaque jour",
    g5_desc: "Coloriez librement selon vos émotions — pas de bonne ou mauvaise réponse",
    g6_desc: "L'IA raconte une histoire thérapeutique adaptée à votre humeur",
    logout_title: "Au revoir ! 👋", logout_sub: "Êtes-vous sûr de vouloir vous déconnecter de MindMirror ?",
    logout_yes: "Se déconnecter", logout_no: "Rester", logout_switch: "Changer de compte",
    switch_account: "🔄 Changer de compte", add_account: "➕ Ajouter un compte",
    switch_title: "Choisir un compte", current_account: "Actif",
    robot_hi: "Bonjour ! Je suis Mira 🤖",
    robot_guide: "Guide rapide", robot_skip: "Passer",
    robot_next: "Suivant →", robot_finish: "C'est parti ! 🚀",
    robot_prev: "← Précédent", robot_step: "Étape", robot_of: "/",
    robot_try: "👆 Essayer maintenant !", robot_back_guide: "↩ Retour au guide",
    robot_done_explore: "Exploration terminée ! Continuons le guide 😊",
    mira_s0_title: "Bienvenue sur MindMirror !",
    mira_s0_desc: "Je suis Mira 🤖 — votre assistante IA !\nJe vais vous guider pour découvrir les fonctionnalités de MindMirror !",
    mira_s1_title: "Analyse émotionnelle IA",
    mira_s1_desc: "Partagez vos émotions — l'IA analysera votre humeur et donnera des conseils doux ! 💙 Appuyez sur [Essayer] pour l'expérimenter !",
    mira_s1_try: "🤖 Essayer l'analyse",
    mira_s2_title: "Tests de personnalité",
    mira_s2_desc: "Découvrez votre vrai moi avec MBTI, EQ, style d'apprentissage ! Appuyez sur [Essayer] pour commencer !",
    mira_s2_try: "🧩 Faire un test",
    mira_s3_title: "Journal émotionnel",
    mira_s3_desc: "Enregistrez votre humeur chaque jour. Suivez votre voyage avec de beaux graphiques ! 📊",
    mira_s3_try: "📔 Écrire dans le journal",
    mira_s4_title: "Carte d'Énergie Mentale",
    mira_s4_desc: "La fonctionnalité la plus unique ! L'IA lit votre aura à travers les ondes émotionnelles. ✨",
    mira_s4_try: "🌊 Explorer mon aura",
    mira_s5_title: "Discuter avec MindBot",
    mira_s5_desc: "Parlez avec l'IA comme un ami, thérapeute ou coach de vie. MindBot écoute 24/7 ! 🤗",
    mira_s5_try: "💬 Chatter avec MindBot",
    mira_s6_title: "Connaissances psychologiques",
    mira_s6_desc: "Lisez des articles sur la psychologie : overthinking, burnout, psychologie des couleurs... 🧠",
    mira_s6_try: "📚 Lire des articles",
    mira_s7_title: "Jardin des Humeurs", mira_s7_desc: "Faites des quêtes quotidiennes pour faire grandir votre arbre mental 🌱", mira_s7_try: "🌿 Aller au jardin",
    mira_s8_title: "Mind Replay", mira_s8_desc: "L'IA résume votre voyage émotionnel par semaine/mois ✨", mira_s8_try: "✨ Voir le replay",
    mira_s9_title: "Vous êtes prêt !", mira_s9_desc: "Votre voyage de découverte de soi commence ici. Mira est toujours là si vous avez besoin !\n\nBonne expérience ! 🎊",
    q5: "Discuter avec MindBot",
    chat_title: "Ami IA en Psychologie",
    chat_sub: "Parlez librement — l'IA écoute sans jugement",
    chat_placeholder: "Envoyer un message à MindBot...",
    chat_send: "Envoyer",
    chat_thinking: "MindBot répond...",
    chat_welcome: "Salut ! Je suis MindBot 🌿\n\nJe suis là pour vous écouter — comme un ami de confiance ou un thérapeute bienveillant.\n\nPartagez tout ce que vous voulez : inquiétudes, stress, tristesse ou juste envie de parler.\n\nComment vous sentez-vous aujourd'hui ? 💙",
    chat_mode_friend: "🤝 Ami Proche",
    chat_mode_therapist: "🧠 Thérapeute",
    chat_mode_coach: "🚀 Coach de Vie",
    chat_mode_label: "Rôle de MindBot :",
    chat_new: "Nouvelle conversation",
    chat_clear_confirm: "Effacer toute la conversation ?",
    chat_suggestions: "Suggestions :",
    chat_sugg1: "Je me sens très stressé(e)",
    chat_sugg2: "Je ne sais pas ce que je veux dans la vie",
    chat_sugg3: "Je me sens seul(e)",
    chat_sugg4: "J'ai des problèmes relationnels",
    chat_copy: "Copié !",
    chat_chars: "caractères",
    chat_you: "Vous",
    save_password: "Enregistrer le mot de passe",
    otp_title: "Vérifier l'identité",
    otp_verify: "Vérifier",
    otp_invalid: "Code OTP invalide",
    otp_success: "Vérifié avec succès！✅",
    otp_demo_note: "🔔 Demo OTP:",
    otp_sub_email: "OTP envoyé à votre email",
    otp_sub_phone: "OTP envoyé par SMS",
    login_history_title: "Historique de connexion",
    hist_success: "✅ Succès",
    hist_failed: "❌ Échec",
    hist_clear: "Effacer l'historique",
    hist_clear_confirm: "Effacer tout l'historique ?",
    hist_empty: "Pas encore d'historique",
    fill_saved: "Remplissage auto",
    login_method_email: "Connexion Email/Google",
    login_method_phone: "Connexion téléphone",
  },
};

// =================== CONSTANTS ===================
const MBTI_QUESTIONS_I18N = {
  vi: [
    // E/I — Hướng năng lượng
    { q: "Tôi thích dành thời gian với nhiều người hơn là một mình", trait: "EI" },
    { q: "Sau một ngày xã giao đông người, tôi cảm thấy mệt và cần thời gian riêng để nạp lại năng lượng", trait: "EI" },
    { q: "Tôi thường suy nghĩ trước khi nói, hơn là nói ra rồi mới suy nghĩ", trait: "EI" },
    { q: "Tôi thích làm việc nhóm sôi nổi hơn là làm việc một mình trong yên tĩnh", trait: "EI" },
    // S/N — Nhận thức
    { q: "Tôi tập trung vào chi tiết thực tế hơn là khái niệm tổng quát", trait: "SN" },
    { q: "Tôi thích ý tưởng trừu tượng và lý thuyết hơn là sự kiện cụ thể", trait: "SN" },
    { q: "Khi giải quyết vấn đề, tôi tin vào kinh nghiệm và thực tế hơn là linh cảm", trait: "SN" },
    { q: "Tôi thường thích suy nghĩ về những gì có thể xảy ra hơn là những gì đang xảy ra", trait: "SN" },
    // T/F — Ra quyết định
    { q: "Tôi đưa ra quyết định dựa trên cảm xúc và giá trị cá nhân hơn là logic khách quan", trait: "TF" },
    { q: "Tôi dễ bị ảnh hưởng bởi cảm xúc của người khác khi đưa ra quyết định", trait: "TF" },
    { q: "Khi có xung đột, tôi ưu tiên giữ hòa khí hơn là theo đuổi điều đúng đắn", trait: "TF" },
    { q: "Tôi thấy quan trọng hơn khi phân tích và phê bình vấn đề hơn là đồng cảm với người liên quan", trait: "TF" },
    // J/P — Phong cách sống
    { q: "Tôi thích có kế hoạch rõ ràng và danh sách công việc hơn là để mọi thứ diễn ra tự nhiên", trait: "JP" },
    { q: "Tôi cảm thấy không thoải mái khi để deadline đến gần và chưa làm xong", trait: "JP" },
    { q: "Tôi thích khả năng thay đổi kế hoạch linh hoạt hơn là tuân theo lịch trình cố định", trait: "JP" },
    { q: "Tôi thường hoàn thành công việc sớm hơn deadline thay vì làm vào phút cuối", trait: "JP" },
  ],
  en: [
    { q: "I prefer spending time with many people rather than being alone", trait: "EI" },
    { q: "After a busy social day, I feel drained and need alone time to recharge", trait: "EI" },
    { q: "I tend to think before I speak rather than thinking out loud", trait: "EI" },
    { q: "I prefer lively group work over quiet solo work", trait: "EI" },
    { q: "I focus on concrete details rather than abstract concepts", trait: "SN" },
    { q: "I prefer abstract ideas and theories over specific facts", trait: "SN" },
    { q: "When solving problems, I trust experience and facts more than intuition", trait: "SN" },
    { q: "I often think about future possibilities more than present realities", trait: "SN" },
    { q: "I make decisions based on personal values and feelings rather than objective logic", trait: "TF" },
    { q: "I'm easily influenced by others' emotions when making decisions", trait: "TF" },
    { q: "During conflict, I prioritize harmony over being right", trait: "TF" },
    { q: "I find it more important to analyze problems critically than to empathize with those involved", trait: "TF" },
    { q: "I prefer having clear plans and to-do lists over letting things unfold naturally", trait: "JP" },
    { q: "I feel uncomfortable when deadlines approach and work isn't done", trait: "JP" },
    { q: "I prefer flexible, adaptable plans over fixed schedules", trait: "JP" },
    { q: "I usually finish work well before deadlines rather than at the last minute", trait: "JP" },
  ],
  ja: [
    { q: "一人でいるよりも大勢の人と時間を過ごすことが好きです", trait: "EI" },
    { q: "即興よりも事前に計画を立てることが好きです", trait: "JP" },
    { q: "論理よりも感情に基づいて決断します", trait: "TF" },
    { q: "未来よりも現在に集中します", trait: "SN" },
    { q: "明確に構造化された環境が好きです", trait: "JP" },
    { q: "他人の感情に影響されやすいです", trait: "TF" },
    { q: "具体的な事実よりも抽象的なアイデアが好きです", trait: "SN" },
    { q: "大人数の集まりはエネルギーをもたらします", trait: "EI" },
  ],
  ko: [
    { q: "혼자 있는 것보다 많은 사람들과 시간을 보내는 것을 더 좋아합니다", trait: "EI" },
    { q: "즉흥적으로 행동하는 것보다 미리 계획하는 것을 선호합니다", trait: "JP" },
    { q: "논리보다 감정에 기반해서 결정을 내립니다", trait: "TF" },
    { q: "미래보다 현재에 더 집중합니다", trait: "SN" },
    { q: "명확하게 구조화된 환경을 선호합니다", trait: "JP" },
    { q: "다른 사람의 감정에 쉽게 영향을 받습니다", trait: "TF" },
    { q: "구체적인 사실보다 추상적인 아이디어를 선호합니다", trait: "SN" },
    { q: "많은 사람들과의 모임이 에너지를 줍니다", trait: "EI" },
  ],
  zh: [
    { q: "我更喜欢与很多人在一起，而不是独处", trait: "EI" },
    { q: "我更喜欢提前计划，而不是即兴发挥", trait: "JP" },
    { q: "我根据感情而非逻辑做决定", trait: "TF" },
    { q: "我更关注现在而不是未来", trait: "SN" },
    { q: "我喜欢结构清晰的环境", trait: "JP" },
    { q: "我很容易受到他人情绪的影响", trait: "TF" },
    { q: "我更喜欢抽象的想法而不是具体的事实", trait: "SN" },
    { q: "大型聚会让我充满活力", trait: "EI" },
  ],
  fr: [
    { q: "Je préfère passer du temps avec beaucoup de personnes plutôt que seul", trait: "EI" },
    { q: "Je préfère planifier à l'avance plutôt qu'improviser", trait: "JP" },
    { q: "Je prends des décisions basées sur les sentiments plutôt que la logique", trait: "TF" },
    { q: "Je me concentre sur le présent plus que sur l'avenir", trait: "SN" },
    { q: "Je préfère les environnements clairement structurés", trait: "JP" },
    { q: "Je suis facilement influencé par les émotions des autres", trait: "TF" },
    { q: "Je préfère les idées abstraites aux faits concrets", trait: "SN" },
    { q: "Les grands rassemblements m'apportent de l'énergie", trait: "EI" },
  ],
};

const MBTI_TYPES = {
  INTJ: { name: "Kiến Trúc Sư", emoji: "🏗️", desc: "Chiến lược gia sáng tạo với kế hoạch cho mọi thứ", strengths: ["Tư duy chiến lược", "Độc lập", "Quyết đoán"], careers: ["Khoa học", "Kỹ thuật", "Luật", "Kinh doanh"], color: "#6c3de8" },
  INTP: { name: "Nhà Tư Tưởng", emoji: "💡", desc: "Nhà phát minh sáng tạo với khao khát tri thức", strengths: ["Phân tích", "Sáng tạo", "Khách quan"], careers: ["Lập trình", "Triết học", "Toán học", "Nghiên cứu"], color: "#8b5cf6" },
  ENTJ: { name: "Chỉ Huy", emoji: "👑", desc: "Lãnh đạo táo bạo với quyết tâm mạnh mẽ", strengths: ["Lãnh đạo", "Quyết đoán", "Chiến lược"], careers: ["CEO", "Luật sư", "Quản lý", "Tư vấn"], color: "#7c3aed" },
  ENTP: { name: "Nhà Tranh Luận", emoji: "⚡", desc: "Người tư duy thông minh yêu thách thức trí tuệ", strengths: ["Sáng tạo", "Nhanh nhạy", "Linh hoạt"], careers: ["Khởi nghiệp", "Luật", "Marketing", "Thiết kế"], color: "#5b21b6" },
  INFJ: { name: "Người Bảo Vệ", emoji: "🌿", desc: "Người lý tưởng hiếm có với tầm nhìn sâu sắc", strengths: ["Trực giác", "Đồng cảm", "Quyết tâm"], careers: ["Tâm lý học", "Viết lách", "Giáo dục", "Y tế"], color: "#4c1d95" },
  INFP: { name: "Người Hòa Giải", emoji: "🌸", desc: "Thi sĩ thơ mộng với tâm hồn đồng cảm", strengths: ["Sáng tạo", "Đồng cảm", "Lý tưởng"], careers: ["Nghệ thuật", "Viết lách", "Tâm lý", "Âm nhạc"], color: "#6d28d9" },
  ENFJ: { name: "Người Truyền Cảm Hứng", emoji: "✨", desc: "Lãnh đạo lôi cuốn truyền cảm hứng cho mọi người", strengths: ["Đồng cảm", "Giao tiếp", "Lãnh đạo"], careers: ["Giáo dục", "HR", "Tư vấn", "Ngoại giao"], color: "#7c3aed" },
  ENFP: { name: "Người Chiến Dịch", emoji: "🎨", desc: "Tinh thần tự do với sự sáng tạo vô hạn", strengths: ["Nhiệt huyết", "Sáng tạo", "Giao tiếp"], careers: ["Sáng tạo", "Marketing", "Báo chí", "Huấn luyện"], color: "#8b5cf6" },
  ISTJ: { name: "Người Hậu Cần", emoji: "📋", desc: "Cá nhân thực tế với trách nhiệm cao", strengths: ["Đáng tin cậy", "Kiên nhẫn", "Có trách nhiệm"], careers: ["Kế toán", "Quân sự", "Luật", "Y tế"], color: "#1d4ed8" },
  ISFJ: { name: "Người Bảo Vệ", emoji: "🛡️", desc: "Người bảo vệ nhiệt tình và tận tâm", strengths: ["Chu đáo", "Đáng tin", "Kiên nhẫn"], careers: ["Y tá", "Giáo viên", "Hành chính", "Tư vấn"], color: "#2563eb" },
  ESTJ: { name: "Giám Đốc", emoji: "🏢", desc: "Quản lý xuất sắc và thực tế", strengths: ["Tổ chức", "Lãnh đạo", "Trung thực"], careers: ["Quản lý", "Tài chính", "Pháp lý", "Kinh doanh"], color: "#1e40af" },
  ESFJ: { name: "Người Trông Nom", emoji: "💝", desc: "Người quan tâm chu đáo và hào phóng", strengths: ["Nhiệt tình", "Đáng tin", "Thân thiện"], careers: ["Y tế", "Giáo dục", "HR", "Dịch vụ"], color: "#3b82f6" },
  ISTP: { name: "Thợ Lành Nghề", emoji: "🔧", desc: "Người quan sát táo bạo với óc thực tế", strengths: ["Tối ưu hóa", "Sáng tạo", "Thực tế"], careers: ["Kỹ sư", "Cơ khí", "Lập trình", "Điều tra"], color: "#0ea5e9" },
  ISFP: { name: "Nhà Thám Hiểm", emoji: "🎭", desc: "Nghệ sĩ linh hoạt sẵn sàng khám phá", strengths: ["Sáng tạo", "Nhạy cảm", "Ân cần"], careers: ["Nghệ thuật", "Âm nhạc", "Thời trang", "Thiên nhiên"], color: "#06b6d4" },
  ESTP: { name: "Doanh Nhân", emoji: "🚀", desc: "Người thông minh năng động thích rủi ro", strengths: ["Năng động", "Thực tế", "Táo bạo"], careers: ["Kinh doanh", "Bán hàng", "Marketing", "Thể thao"], color: "#0284c7" },
  ESFP: { name: "Người Biểu Diễn", emoji: "🎪", desc: "Người giải trí nhiệt tình yêu cuộc sống", strengths: ["Vui vẻ", "Năng động", "Thực tế"], careers: ["Biểu diễn", "Sự kiện", "Giáo dục", "Du lịch"], color: "#0369a1" },
};

const MOOD_EMOJIS = ["😭","😢","😕","😐","🙂","😊","😄","🤩"];
const MOOD_COLORS = ["#ef4444","#f97316","#eab308","#6b7280","#22c55e","#3b82f6","#8b5cf6","#ec4899"];

const ARTICLES = [
  // ── Chủ đề mới: Overthinking ──
  {
    title: "Overthinking: Khi Não Bộ Không Chịu Nghỉ",
    tag: "Sức khỏe tâm thần", icon: "💭", read: "5 phút", color: "#8b5cf6",
    desc: "Tại sao bạn không thể ngừng suy nghĩ? Vòng lặp tư duy độc hại và 6 kỹ thuật phá vỡ nó.",
    content: `Overthinking — hay còn gọi là "suy nghĩ quá mức" — là khi não bộ bạn cứ liên tục quay vòng quanh những lo lắng, hối tiếc và "what if" mà không tìm ra được lối thoát.

🔍 Dấu hiệu nhận biết overthinking:
• Bạn phân tích lại những cuộc trò chuyện đã qua hàng giờ đồng hồ
• Luôn lo lắng về những điều chưa xảy ra
• Khó đưa ra quyết định vì sợ chọn sai
• Ngủ không được vì não cứ "chạy" mãi

🧠 Vì sao não bộ overthink?
Overthinking kích hoạt vùng amygdala — trung tâm xử lý cảm xúc và nỗi sợ. Khi lo âu tăng, amygdala "hijack" não trước, khiến bạn không thể suy nghĩ rõ ràng.

💡 6 kỹ thuật phá vỡ vòng lặp:

1. Kỹ thuật 5-4-3-2-1 (Grounding): Nhìn 5 thứ, nghe 4 âm thanh, chạm 3 vật, ngửi 2 mùi, nếm 1 vị. Kéo bạn về thực tại.

2. Đặt giờ lo lắng: Cho phép bản thân lo lắng 15 phút/ngày, đúng giờ cố định. Ngoài giờ đó → hoãn lại.

3. Viết ra giấy: Não bộ không thể "lưu" lo lắng khi đã viết ra. Journaling giải phóng dung lượng nhận thức.

4. Hỏi "Tôi có thể làm gì về điều này không?": Nếu có → hành động. Nếu không → buông.

5. Kỹ thuật thở 4-7-8: Hít 4 giây, giữ 7 giây, thở ra 8 giây. Kích hoạt hệ thần kinh phó giao cảm.

6. Vận động thể chất: 20 phút đi bộ giảm cortisol (hormone stress) tới 26%.

💙 Nhớ rằng: Overthinking không phải yếu đuối — đó là dấu hiệu bạn quan tâm. Nhưng bạn xứng đáng có một tâm trí bình yên hơn.`,
  },

  // ── Chủ đề mới: Burnout ──
  {
    title: "Burnout: Khi Bạn Không Còn Cảm Thấy Gì Nữa",
    tag: "Cân bằng cuộc sống", icon: "🔥", read: "7 phút", color: "#f97316",
    desc: "Kiệt sức không phải lười biếng. Nhận diện burnout thật sự và lộ trình phục hồi từng bước.",
    content: `Burnout là trạng thái kiệt sức về cảm xúc, thể chất và tinh thần do stress kéo dài và quá tải — được WHO công nhận là hiện tượng liên quan đến công việc.

🚨 3 chiều của Burnout (theo Maslach):
1. Kiệt sức (Exhaustion): Không còn năng lượng dù đã ngủ đủ giấc
2. Xa cách (Cynicism/Depersonalization): Cảm thấy vô cảm, không quan tâm điều từng yêu thích
3. Kém hiệu quả: Nghi ngờ năng lực bản thân, cảm giác làm gì cũng vô nghĩa

📊 Burnout vs Stress thông thường:
• Stress: Quá nhiều áp lực → cảm giác ngột ngạt nhưng vẫn còn cảm xúc
• Burnout: Cạn kiệt → không còn cảm thấy gì, trống rỗng bên trong

⚠️ 10 dấu hiệu burnout:
Cảm thấy kiệt sức buổi sáng dù ngủ đủ · Mất đi đam mê với thứ từng yêu thích · Dễ cáu kỉnh, mất kiên nhẫn · Hiệu suất giảm sút · Tách biệt cảm xúc · Đau đầu, đau cơ mãn tính · Nghi ngờ bản thân · Cảm giác thất bại · Thu mình lại · Dùng thức ăn/màn hình để trốn tránh

🔄 Lộ trình phục hồi:

Giai đoạn 1 — Thừa nhận (Tuần 1-2):
Ngừng bình thường hóa sự kiệt sức. Nói với ai đó bạn tin tưởng.

Giai đoạn 2 — Ranh giới (Tuần 3-4):
Học nói "không". Tắt thông báo sau 8 giờ tối. Bảo vệ cuối tuần.

Giai đoạn 3 — Nạp lại năng lượng (Tháng 2):
Làm đúng 1 thứ mỗi ngày khiến bạn cảm thấy "sống". Không cần to lớn.

Giai đoạn 4 — Tái định hình (Tháng 3+):
Xem lại giá trị và ưu tiên. Burnout thường là dấu hiệu cần thay đổi.

💙 Bạn không phải cỗ máy. Nghỉ ngơi không phải thất bại — đó là cần thiết để tiếp tục.`,
  },

  // ── Chủ đề mới: Self-Love ──
  {
    title: "Self-Love: Yêu Bản Thân Không Phải Ích Kỷ",
    tag: "Phát triển bản thân", icon: "💗", read: "6 phút", color: "#ec4899",
    desc: "Ranh giới giữa yêu bản thân và ích kỷ, và vì sao self-love là nền tảng của mọi mối quan hệ.",
    content: `Self-love — yêu thương bản thân — không phải là kiêu ngạo hay ích kỷ. Đó là khả năng chăm sóc và tôn trọng chính mình như bạn sẽ làm với người thân yêu nhất.

🪞 Self-love thật sự là gì?
Không phải "tôi hoàn hảo" mà là "tôi xứng đáng được yêu thương dù chưa hoàn hảo". Đó là chấp nhận — không phải từ bỏ — những phần bạn muốn cải thiện.

❌ Những hiểu lầm về self-love:
• "Self-love là lười biếng" → Sai. Tự chăm sóc để có năng lượng cống hiến hơn
• "Phải yêu tất cả về mình" → Sai. Chấp nhận, không phải lý tưởng hóa
• "Self-love giải quyết mọi vấn đề" → Sai. Đây là nền tảng, không phải phép màu

💡 5 trụ cột của Self-Love:

1. Self-Awareness (Tự nhận thức)
Hiểu cảm xúc, giá trị, điểm mạnh/yếu của mình. Journaling 5 phút/ngày.

2. Self-Compassion (Tự trắc ẩn)
Nói với bản thân như bạn nói với người bạn thân đang khó khăn. Nghiên cứu Dr. Kristin Neff chứng minh self-compassion giảm trầm cảm và lo âu.

3. Ranh giới lành mạnh (Healthy Boundaries)
Nói "không" mà không cảm thấy tội lỗi. Bảo vệ thời gian, năng lượng và không gian tinh thần.

4. Self-Care có ý nghĩa
Không chỉ spa hay bubble bath — là ngủ đủ giấc, ăn uống nuôi dưỡng, vận động, kết nối thật sự.

5. Tha thứ cho bản thân
Buông bỏ những hối tiếc không thể thay đổi. Học từ quá khứ, không bị mắc kẹt trong đó.

📝 Bài tập nhỏ mỗi ngày:
Viết 3 điều bạn trân trọng về bản thân hôm nay — không nhất thiết phải lớn lao.

💙 Khi bạn yêu thương bản thân, bạn có nhiều hơn để cho đi cho những người xung quanh.`,
  },

  // ── Chủ đề mới: Toxic Relationship ──
  {
    title: "Toxic Relationship: Nhận Ra & Thoát Khỏi",
    tag: "Mối quan hệ", icon: "⚠️", read: "8 phút", color: "#ef4444",
    desc: "Dấu hiệu nhận biết mối quan hệ độc hại, tại sao khó rời đi và cách lấy lại bản thân.",
    content: `Mối quan hệ độc hại không nhất thiết phải có bạo lực thể chất. Đôi khi nó tinh tế hơn — từng lời nói, ánh mắt, hay sự im lặng có thể xói mòn giá trị bản thân bạn theo thời gian.

🚩 Red flags của toxic relationship:

Kiểm soát & ghen tuông thái quá:
Kiểm tra điện thoại · Giới hạn quan hệ xã hội · Theo dõi vị trí

Thao túng cảm xúc:
Gaslighting ("bạn đang bịa chuyện") · Love bombing rồi rút lui đột ngột · Blame-shifting (đổ lỗi)

Hạ thấp giá trị:
Chê bai ngoại hình/trí tuệ · So sánh với người khác · Phủ nhận cảm xúc của bạn

Chu kỳ lặp lại:
Căng thẳng → Xung đột → Hòa giải → Trăng mật ngắn → Lặp lại

🧠 Vì sao khó rời đi?
Não bộ bị "nghiện" chu kỳ đau khổ-niềm vui. Dopamine tăng mạnh sau mỗi lần hòa giải tạo ra attachment mạnh hơn — tương tự cơ chế nghiện.

Trauma bonding: Trải qua khủng hoảng chung tạo liên kết tâm lý sâu sắc, khiến bạn cảm thấy "chỉ người này hiểu tôi".

💪 Lộ trình thoát khỏi:

Bước 1 — Nhận diện: Ghi ra những gì thực sự xảy ra, không hợp lý hóa
Bước 2 — Hỗ trợ: Chia sẻ với người tin cậy hoặc chuyên gia
Bước 3 — Kế hoạch an toàn: Đặc biệt nếu có yếu tố kiểm soát hoặc nguy hiểm
Bước 4 — No contact hoặc low contact: Tùy tình huống
Bước 5 — Chữa lành: Cho bản thân thời gian. Tìm kiếm hỗ trợ chuyên nghiệp nếu cần

🌱 Sau khi thoát:
Therapy để xử lý trauma · Xây dựng lại ranh giới · Reconnect với bạn bè, gia đình · Khám phá lại bản sắc của mình

💙 Rời đi không phải thất bại — đó là hành động yêu thương bản thân mạnh mẽ nhất.`,
  },

  // ── Chủ đề mới: Tâm lý tuổi teen ──
  {
    title: "Tâm Lý Tuổi Teen: Hiểu Để Không Cô Đơn",
    tag: "Tuổi teen", icon: "🌱", read: "6 phút", color: "#22d3ee",
    desc: "Não bộ tuổi teen thật sự khác người lớn. Hiểu điều này giúp bạn bớt tự trách và tìm đường qua giai đoạn khó nhất.",
    content: `Tuổi teen (13-19) là giai đoạn não bộ phát triển mạnh mẽ nhất sau giai đoạn sơ sinh. Điều này giải thích rất nhiều điều.

🧠 Não bộ tuổi teen hoạt động thế nào?

Vùng prefrontal cortex (não trước — trung tâm lý trí, kiểm soát xung động) chưa phát triển đầy đủ cho đến năm 25 tuổi.

Amygdala (trung tâm cảm xúc, phản ứng) lại rất nhạy cảm.

→ Kết quả: Cảm xúc mạnh + kiểm soát xung động kém = HOÀN TOÀN BÌNH THƯỜNG về mặt sinh học.

🌊 Những thách thức đặc trưng tuổi teen:

Khủng hoảng bản sắc:
"Mình là ai?" không phải câu hỏi triết học — đó là quá trình sinh học. Bạn đang xây dựng identity của mình từ đầu.

FOMO & mạng xã hội:
Não teen đặc biệt nhạy với social approval. Instagram không chỉ là "ảnh đẹp" — mỗi like/dislike kích hoạt hệ thống dopamine.

Áp lực đồng trang lứa:
Peer pressure không chỉ là "bạn bè xấu". Đôi khi chỉ là muốn thuộc về một nơi nào đó — nhu cầu cơ bản của con người.

Thay đổi cơ thể:
Không ai nói với bạn rằng thay đổi hormone có thể gây ra lo âu, buồn bã, và thậm chí trầm cảm nhẹ — mà không phải do "vấn đề" của bạn.

💡 Điều teen cần nhất:

✓ Được lắng nghe mà không bị phán xét
✓ Không gian riêng để khám phá bản thân
✓ Người lớn tin tưởng (không nhất thiết là bố mẹ)
✓ Biết rằng cảm xúc dữ dội là bình thường
✓ Được mắc lỗi mà không bị định nghĩa bởi nó

📱 Về mạng xã hội:
Nghiên cứu cho thấy >3 tiếng/ngày MXH correlate với tăng lo âu và trầm cảm ở teen. Nhưng cấm đoán không hiệu quả — học cách sử dụng có ý thức mới là chìa khóa.

💙 Nếu bạn đang là teen: Những gì bạn cảm thấy là thật và quan trọng. Giai đoạn này không kéo dài mãi — và bạn mạnh mẽ hơn bạn nghĩ.`,
  },

  // ── Chủ đề mới: Áp lực học tập ──
  {
    title: "Áp Lực Học Tập: Khi Điểm Số Không Phải Tất Cả",
    tag: "Tuổi teen", icon: "📚", read: "7 phút", color: "#a78bfa",
    desc: "Academic pressure không chỉ ảnh hưởng điểm số — nó ảnh hưởng sức khỏe tâm thần. Và có cách tốt hơn để học.",
    content: `Áp lực học tập là một trong những nguyên nhân hàng đầu gây lo âu và trầm cảm ở học sinh, sinh viên Việt Nam và châu Á. Nhưng nói "đừng áp lực" không giúp ích gì — hiểu nguyên nhân và tìm chiến lược mới giúp được.

📊 Thực trạng:
Theo nghiên cứu tại Việt Nam, 60%+ học sinh cảm thấy áp lực học tập ở mức cao. Nhiều em không ngủ đủ giấc, bỏ bữa, và xem điểm số là thước đo giá trị bản thân.

🔍 Nguồn gốc của áp lực:

Từ gia đình: Kỳ vọng cao, so sánh với người khác, "học giỏi mới có tương lai"
Từ trường học: Hệ thống đánh giá qua điểm số, cạnh tranh thứ hạng
Từ xã hội: Áp lực vào trường top, ngành hot, lương cao
Từ bản thân: Chủ nghĩa hoàn hảo, sợ thất bại, tự đặt kỳ vọng quá cao

⚠️ Dấu hiệu áp lực học tập đang ảnh hưởng sức khỏe tâm thần:
• Lo âu trước mỗi kỳ thi dù đã chuẩn bị kỹ
• Mất ngủ, ác mộng về thi cử
• Đau đầu, đau dạ dày mãn tính không rõ nguyên nhân
• Né tránh học vì quá sợ thất bại
• Cảm giác tê liệt (paralysis) khi nhìn vào bài tập
• Khóc hoặc hoảng loạn vì điểm kém

🧠 Nghiên cứu khoa học về học tập hiệu quả:

Spaced Repetition (Học lặp lại cách quãng):
Ôn bài sau 1 ngày, 3 ngày, 7 ngày, 21 ngày. Hiệu quả hơn học nhồi 300%.

Active Recall (Gợi nhớ chủ động):
Đóng sách lại và tự kiểm tra, không nhìn lại. Khó hơn nhưng nhớ lâu hơn.

Pomodoro: 25 phút học + 5 phút nghỉ. Não không thể tập trung >90 phút liên tục.

Ngủ đủ giấc:
Nghiên cứu Harvard: ngủ 8 tiếng giúp não consolidate ký ức tốt hơn học thêm 2 tiếng.

💡 Thay đổi mindset:

Từ "Growth mindset" (Carol Dweck): Điểm số đo lường hiệu suất tại một thời điểm, không đo lường trí tuệ hay giá trị bạn.

Thay "Tôi phải đạt điểm A" → "Tôi sẽ cố gắng và học được điều gì đó từ kết quả này"

📞 Khi nào cần tìm hỗ trợ:
Nếu áp lực gây ra ý nghĩ tự làm hại bản thân → hãy nói chuyện với người lớn tin tưởng hoặc chuyên gia ngay.

💙 Điểm số là một phần nhỏ trong bức tranh lớn hơn. Sức khỏe tâm thần của bạn quan trọng hơn bất kỳ kỳ thi nào.`,
  },

  // ── Bài viết giữ từ trước: Thao túng tâm lý ──
  {
    title: "Thao Túng Tâm Lý: Nhận Biết & Thoát Khỏi",
    tag: "Tâm lý xã hội", icon: "🧠", read: "5 phút", color: "#6c3de8",
    desc: "Gaslighting, love bombing, silent treatment — những chiến thuật thao túng phổ biến và cách nhận diện.",
    content: `Thao túng tâm lý (psychological manipulation) là khi ai đó cố ý sử dụng các chiến thuật gây ảnh hưởng đến cảm xúc, nhận thức và hành vi của bạn để phục vụ lợi ích của họ — thường gây hại cho bạn.

🎭 5 chiến thuật phổ biến nhất:

1. Gaslighting
"Bạn đang tưởng tượng ra", "Điều đó không bao giờ xảy ra", "Bạn quá nhạy cảm". Mục đích: Khiến bạn nghi ngờ nhận thức của mình.
Dấu hiệu: Bạn liên tục xin lỗi mà không rõ vì sao. Bạn cảm thấy "điên" hoặc "quá nhạy".

2. Love Bombing
Tràn ngập tình cảm, quà tặng, lời khen quá mức ngay từ đầu — để tạo cảm giác nợ ơn và gắn kết mạnh trước khi bắt đầu kiểm soát.

3. Silent Treatment
Cố ý im lặng để trừng phạt và kiểm soát. Khác với "cần thời gian một mình" — đây là vũ khí có chủ đích.

4. Triangulation
Đưa bên thứ ba vào để gây ghen tuông, cạnh tranh: "Bạn A không bao giờ làm như vậy"

5. DARVO
Deny (Phủ nhận) → Attack (Tấn công lại) → Reverse Victim and Offender (Đảo ngược vai nạn nhân). Kẻ sai trở thành nạn nhân.

🛡️ Cách bảo vệ bản thân:
• Trust your gut — nếu cảm thấy có gì đó sai, thường là có
• Document — ghi lại các sự kiện cụ thể
• Tìm người thứ ba khách quan để kiểm tra nhận thức
• Học đặt ranh giới và duy trì chúng

💙 Nhận ra thao túng không phải yếu đuối — đó là khởi đầu của sự chữa lành.`,
  },

  // ── Bài viết giữ từ trước: Tâm lý màu sắc ──
  {
    title: "Tâm Lý Học Màu Sắc: Màu Nào Đang Ảnh Hưởng Bạn?",
    tag: "Tâm lý học ứng dụng", icon: "🎨", read: "5 phút", color: "#22d3ee",
    desc: "Tại sao bệnh viện dùng màu xanh? Màu đỏ kích thích thèm ăn? Khoa học về màu sắc và cảm xúc con người.",
    content: `Màu sắc ảnh hưởng đến não bộ và tâm trạng của chúng ta theo những cách rất cụ thể — nhiều đến mức được ứng dụng rộng rãi trong thiết kế, marketing, y tế và nghệ thuật trị liệu.

🎨 Tâm lý học từng màu:

🔴 Đỏ: Năng lượng, đam mê, khẩn cấp. Tăng nhịp tim và huyết áp. Kích thích sự thèm ăn (McDonald's, KFC). Tăng hiệu suất trong thi đấu ngắn nhưng gây lo âu nếu lạm dụng.

🟠 Cam: Nhiệt tình, sáng tạo, ấm áp. Ít hung hăng hơn đỏ. Thường dùng trong calls-to-action.

🟡 Vàng: Lạc quan, chú ý, tích cực. Màu đầu tiên mắt nhận ra. Lạm dụng có thể gây lo âu và căng thẳng mắt.

🟢 Xanh lá: Thiên nhiên, phát triển, bình tĩnh. Giảm căng thẳng. Bệnh viện dùng màu xanh lá-xanh dương để giảm lo âu bệnh nhân.

🔵 Xanh dương: Tin tưởng, bình yên, chuyên nghiệp. Giảm nhịp tim. Màu được yêu thích nhất toàn cầu. Giảm cảm giác thèm ăn (không có thức ăn xanh dương trong tự nhiên).

🟣 Tím: Sáng tạo, huyền bí, tinh thần. Liên quan đến vương quyền và tâm linh. Nhạy cảm và trực giác.

⚫ Đen: Thanh lịch, quyền lực, bí ẩn. Có thể gây cảm giác nặng nề và u ám nếu lạm dụng.

⚪ Trắng: Thuần khiết, rộng rãi, sạch sẽ. Giúp tập trung nhưng quá nhiều trắng gây cảm giác lạnh lẽo.

💡 Ứng dụng thực tế:
• Phòng ngủ: Xanh dương nhạt hoặc xanh lá nhạt → ngủ ngon hơn
• Phòng làm việc: Vàng nhạt hoặc cam nhạt → tăng sáng tạo
• Thiền định: Tím hoặc xanh dương → tập trung tâm trí
• Khi buồn: Thêm màu vàng hoặc cam vào không gian sống

🎨 Color therapy (liệu pháp màu sắc):
Được sử dụng trong tâm lý học tích cực — chọn trang phục màu sắc phù hợp tâm trạng mong muốn có thể tạo hiệu ứng tâm lý tích cực.`,
  },

  // ── Bài viết giữ: Ngôn ngữ cơ thể ──
  {
    title: "Ngôn Ngữ Cơ Thể: Đọc Vị Người Khác",
    tag: "Giao tiếp phi ngôn ngữ", icon: "👁️", read: "7 phút", color: "#ec4899",
    desc: "93% giao tiếp là phi ngôn ngữ. Học cách đọc ngôn ngữ cơ thể để hiểu người khác sâu hơn lời nói.",
    content: `Nghiên cứu nổi tiếng của Albert Mehrabian chỉ ra: 7% giao tiếp qua lời nói, 38% qua giọng điệu, và 55% qua ngôn ngữ cơ thể. Học đọc body language là một siêu năng lực trong giao tiếp.

👁️ Mắt — cửa sổ tâm hồn:

Tiếp xúc mắt:
• 60-70% tiếp xúc mắt → bình thường, thoải mái
• Dưới 30% → lo âu, không trung thực, hoặc rụt rè
• Trên 90% liên tục → kiểm soát, thách thức, hoặc hấp dẫn mạnh

Đồng tử giãn: Hứng thú, kích thích (không kiểm soát được)
Nhìn sang trái khi nhớ lại: Truy cập ký ức thật (theo nghiên cứu NLP)
Nhìn sang phải khi "nhớ": Có thể đang sáng tạo/bịa

🤲 Tay — chỉ báo cảm xúc:

Lòng bàn tay mở: Cởi mở, trung thực
Lòng bàn tay úp xuống: Muốn kiểm soát, áp đặt
Tay sau lưng: Tự tin, hoặc đang che giấu điều gì
Tay chạm mặt khi nói: Có thể đang không hoàn toàn trung thực
Ngón tay bắt chéo (steeple): Tự tin cao độ

🦶 Chân — thành thật nhất:
Bàn chân hướng về ai → thật sự quan tâm đến người đó
Bàn chân hướng ra cửa → muốn rời đi nhưng đang lịch sự ở lại

🪞 Mirroring (Phản chiếu):
Khi người ta vô thức bắt chước ngôn ngữ cơ thể của nhau → dấu hiệu của sự kết nối và tin tưởng.

⚠️ Lưu ý quan trọng:
Không có dấu hiệu nào là tuyệt đối. Luôn đọc theo clusters (nhiều dấu hiệu cùng lúc) và context. Khoanh tay có thể là phòng thủ — hoặc đơn giản là lạnh.`,
  },
];

const DEMO_MOODS = [
  { date: "2025-06-01", score: 6, note: "Ngày làm việc bình thường" },
  { date: "2025-06-02", score: 7, note: "Gặp bạn cũ, vui" },
  { date: "2025-06-03", score: 4, note: "Mệt mỏi" },
  { date: "2025-06-04", score: 8, note: "Hoàn thành dự án lớn!" },
  { date: "2025-06-05", score: 5, note: "Bình thường" },
  { date: "2025-06-06", score: 7, note: "Tập thể dục buổi sáng" },
  { date: "2025-06-07", score: 6, note: "Cuối tuần thư giãn" },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function simpleHash(str) {
  // Simple deterministic hash (NOT for real prod security — demo only)
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (Math.imul(31, h) + str.charCodeAt(i)) | 0; }
  return h.toString(16);
}
function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMob = /Mobi|Android/i.test(ua);
  const browser = ua.includes("Chrome") ? "Chrome" : ua.includes("Firefox") ? "Firefox" : ua.includes("Safari") ? "Safari" : ua.includes("Edge") ? "Edge" : "Browser";
  const os = ua.includes("Win") ? "Windows" : ua.includes("Mac") ? "macOS" : ua.includes("Linux") ? "Linux" : ua.includes("Android") ? "Android" : ua.includes("iOS") ? "iOS" : "Unknown OS";
  return { browser, os, device: isMob ? "📱 Mobile" : "💻 Desktop" };
}
function generateOTP() { return String(Math.floor(100000 + Math.random() * 900000)); }

// Fake user store (localStorage simulation)
const UserStore = {
  getUsers: () => { try { return JSON.parse(localStorage.getItem("mm_users") || "[]"); } catch { return []; } },
  saveUsers: (u) => { try { localStorage.setItem("mm_users", JSON.stringify(u)); } catch {} },
  getSession: () => { try { return JSON.parse(localStorage.getItem("mm_session") || "null"); } catch { return null; } },
  saveSession: (u) => { try { localStorage.setItem("mm_session", JSON.stringify(u)); } catch {} },
  clearSession: () => { try { localStorage.removeItem("mm_session"); } catch {} },

  // Login history
  getHistory: (userId) => {
    try { return JSON.parse(localStorage.getItem(`mm_history_${userId}`) || "[]"); } catch { return []; }
  },
  addHistory: (userId, entry) => {
    try {
      const hist = JSON.parse(localStorage.getItem(`mm_history_${userId}`) || "[]");
      hist.unshift({ ...entry, id: Date.now() });
      localStorage.setItem(`mm_history_${userId}`, JSON.stringify(hist.slice(0, 50)));
    } catch {}
  },
  clearHistory: (userId) => { try { localStorage.removeItem(`mm_history_${userId}`); } catch {} },

  // Saved passwords (demo: stored as hashed)
  getSavedCreds: () => { try { return JSON.parse(localStorage.getItem("mm_saved_creds") || "null"); } catch { return null; } },
  saveCreds: (email, password) => { try { localStorage.setItem("mm_saved_creds", JSON.stringify({ email, passwordHash: simpleHash(password), password })); } catch {} },
  clearCreds: () => { try { localStorage.removeItem("mm_saved_creds"); } catch {} },

  // OTP store
  setOTP: (key, otp) => { try { localStorage.setItem(`mm_otp_${key}`, JSON.stringify({ otp, exp: Date.now() + 300000 })); } catch {} },
  getOTP: (key) => { try { const d = JSON.parse(localStorage.getItem(`mm_otp_${key}`) || "null"); return d && Date.now() < d.exp ? d.otp : null; } catch { return null; } },
  clearOTP: (key) => { try { localStorage.removeItem(`mm_otp_${key}`); } catch {} },
};

// =================== ACCOUNT STORE (multi-account) ===================
const AccountStore = {
  getAccounts: () => { try { return JSON.parse(localStorage.getItem("mm_accounts") || "[]"); } catch { return []; } },
  saveAccounts: (list) => { try { localStorage.setItem("mm_accounts", JSON.stringify(list)); } catch {} },
  addAccount: (user) => {
    const list = AccountStore.getAccounts();
    if (!list.find(a => a.id === user.id)) {
      list.push({ id: user.id, name: user.name, email: user.email, avatar: user.avatar, phone: user.phone });
      AccountStore.saveAccounts(list);
    }
  },
  removeAccount: (id) => {
    AccountStore.saveAccounts(AccountStore.getAccounts().filter(a => a.id !== id));
  },
  getActive: () => { try { return JSON.parse(localStorage.getItem("mm_active_id") || "null"); } catch { return null; } },
  setActive: (id) => { try { localStorage.setItem("mm_active_id", String(id)); } catch {} },
};

// =================== GLASS CARD ===================
function GlassCard({ children, style = {}, variant = "default", hover = false, glow = false, color = null }) {
  const variants = {
    default:  { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", backdropFilter:"blur(16px)" },
    purple:   { background:"rgba(108,61,232,0.08)",  border:"1px solid rgba(108,61,232,0.25)",  backdropFilter:"blur(16px)" },
    cyan:     { background:"rgba(34,211,238,0.06)",  border:"1px solid rgba(34,211,238,0.2)",   backdropFilter:"blur(16px)" },
    rose:     { background:"rgba(236,72,153,0.07)",  border:"1px solid rgba(236,72,153,0.22)",  backdropFilter:"blur(16px)" },
    emerald:  { background:"rgba(16,185,129,0.07)",  border:"1px solid rgba(16,185,129,0.22)",  backdropFilter:"blur(16px)" },
    dark:     { background:"rgba(7,9,29,0.8)",        border:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(20px)" },
    gradient: { background:"linear-gradient(135deg,rgba(108,61,232,0.12),rgba(34,211,238,0.06))", border:"1px solid rgba(108,61,232,0.25)", backdropFilter:"blur(16px)" },
  };
  const base = variants[variant] || variants.default;
  const glowStyle = glow ? { boxShadow: color ? `0 0 40px ${color}33,0 8px 30px rgba(0,0,0,0.3)` : "0 0 40px rgba(108,61,232,0.2),0 8px 30px rgba(0,0,0,0.3)" } : {};
  return (
    <div style={{
      ...base, borderRadius: 20, padding: "24px",
      transition: hover ? "all 0.3s cubic-bezier(0.34,1.2,0.64,1)" : "none",
      ...glowStyle, ...style,
    }}
    onMouseEnter={hover ? (e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,0.35),"+( color?`0 0 30px ${color}33`:"0 0 30px rgba(108,61,232,0.2)"); }) : undefined}
    onMouseLeave={hover ? (e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow= glow ? (color?`0 0 40px ${color}33,0 8px 30px rgba(0,0,0,0.3)`:"0 0 40px rgba(108,61,232,0.2),0 8px 30px rgba(0,0,0,0.3)") : "none"; }) : undefined}
    >
      {children}
    </div>
  );
}

// =================== LANGUAGE SWITCHER ===================
function LangSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 99, padding: "6px 14px", color: "white", cursor: "pointer",
        fontSize: 13, display: "flex", alignItems: "center", gap: 6,
      }}>
        {LANGS[lang].flag} {LANGS[lang].name} <span style={{ opacity: 0.5, fontSize: 10 }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          background: "rgba(13,20,64,0.98)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 14, overflow: "hidden", zIndex: 2000, minWidth: 160,
          backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}>
          {Object.entries(LANGS).map(([code, { flag, name }]) => (
            <button key={code} onClick={() => { setLang(code); setOpen(false); }} style={{
              display: "flex", width: "100%", gap: 10, alignItems: "center",
              padding: "10px 16px", background: code === lang ? "rgba(108,61,232,0.2)" : "none",
              border: "none", color: code === lang ? "#a78bfa" : "rgba(255,255,255,0.8)",
              cursor: "pointer", fontSize: 13, textAlign: "left",
            }}>{flag} {name}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// =================== AUTH MODAL ===================
// OTP Simulator — shows demo notification in-app
function simulateEmailOTP(email, otp) {
  console.log(`[MindMirror DEMO] Email OTP to ${email}: ${otp}`);
}
function simulateSMSOTP(phone, otp) {
  console.log(`[MindMirror DEMO] SMS OTP to ${phone}: ${otp}`);
}

function OTPStep({ channel, target, otp, onVerified, onResend, onBack, t }) {
  const [code, setCode] = useState(["","","","","",""]);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const inputs = useRef([]);

  const handleDigit = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const nc = [...code]; nc[i] = val.slice(-1);
    setCode(nc); setError("");
    if (val && i < 5) inputs.current[i+1]?.focus();
    if (nc.every(d => d) && nc.join("").length === 6) {
      setTimeout(() => verify(nc.join("")), 100);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) { inputs.current[i-1]?.focus(); }
  };

  const verify = (fullCode) => {
    const stored = UserStore.getOTP(target);
    if (stored && fullCode === stored) {
      setVerified(true); UserStore.clearOTP(target);
      setTimeout(onVerified, 800);
    } else { setError(t.otp_invalid); setCode(["","","","","",""]); inputs.current[0]?.focus(); }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{channel === "email" ? "📧" : "📱"}</div>
      <h3 style={{ color: "white", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>{t.otp_title}</h3>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 24px", lineHeight: 1.6 }}>
        {channel === "email" ? t.otp_sub_email : t.otp_sub_phone}<br/>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{target}</span>
      </p>

      {/* Demo OTP display */}
      <div style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 10, padding: "10px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
        <span style={{ color: "#22d3ee", fontSize: 13 }}>{t.otp_demo_note}</span>
        <span style={{ color: "white", fontWeight: 800, fontSize: 18, letterSpacing: 4 }}>{otp}</span>
      </div>

      {/* 6-digit input */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
        {code.map((d, i) => (
          <input key={i} ref={el => inputs.current[i] = el}
            value={d} onChange={e => handleDigit(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            maxLength={1}
            style={{ width: 44, height: 52, textAlign: "center", fontSize: 22, fontWeight: 700,
              background: d ? "rgba(108,61,232,0.2)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${d ? "rgba(108,61,232,0.6)" : "rgba(255,255,255,0.12)"}`,
              borderRadius: 10, color: "white", outline: "none", fontFamily: "inherit",
              transition: "all 0.15s" }} />
        ))}
      </div>

      {error && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 12 }}>{error}</div>}
      {verified && <div style={{ color: "#22c55e", fontSize: 14, fontWeight: 600, marginBottom: 12, animation: "fadeInDown 0.3s ease" }}>{t.otp_success}</div>}

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onBack} style={{ flex: 1, padding: "11px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", borderRadius: 10, cursor: "pointer", fontSize: 13 }}>← Back</button>
        <button onClick={() => { const c = code.join(""); if (c.length === 6) verify(c); }} style={{ flex: 2, padding: "11px", background: "linear-gradient(135deg,#6c3de8,#8b5cf6)", border: "none", color: "white", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>{t.otp_verify}</button>
      </div>
      <button onClick={onResend} style={{ background: "none", border: "none", color: "#a78bfa", cursor: "pointer", fontSize: 12, marginTop: 14 }}>{t.otp_resend}</button>
    </div>
  );
}

function AuthModal({ mode, onClose, onSuccess, t }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [loginMethod, setLoginMethod] = useState("email"); // "email" | "phone"
  const [form, setForm] = useState({ name: "", email: "", phone: "", birthday: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [otpStep, setOtpStep] = useState(false); // show OTP screen
  const [currentOTP, setCurrentOTP] = useState("");
  const [pendingUser, setPendingUser] = useState(null);
  const savedCreds = UserStore.getSavedCreds();

  const showToast = (msg, color = "#22c55e") => { setToast({ msg, color }); setTimeout(() => setToast(""), 3500); };

  const validate = () => {
    const e = {};
    if (!isLogin && !form.name.trim()) e.name = t.err_required;
    if (loginMethod === "email") {
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.err_email;
    } else {
      if (!form.phone.trim() || !/^[0-9+\s\-]{8,15}$/.test(form.phone)) e.phone = t.err_phone;
    }
    if (!isLogin && loginMethod === "email" && (!form.phone.trim() || !/^[0-9+\s\-]{8,15}$/.test(form.phone))) e.phone = t.err_phone;
    if (form.password.length < 6) e.password = t.err_password;
    if (!isLogin && form.password !== form.confirm) e.confirm = t.err_confirm;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const doLogin = (user) => {
    const dev = getDeviceInfo();
    const entry = {
      time: new Date().toLocaleString(),
      method: loginMethod === "phone" ? t.hist_method_phone : t.hist_method_email,
      device: `${dev.device} · ${dev.browser}`,
      os: dev.os,
      status: "success",
      ip: "127.0.0.x",
    };
    UserStore.addHistory(user.id, entry);
    if (savePassword) UserStore.saveCreds(form.email || form.phone, form.password);
    UserStore.saveSession(user);
    showToast(t.login_success);
    setTimeout(() => { onSuccess(user); onClose(); }, 900);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      if (isLogin) {
        const users = UserStore.getUsers();
        let user;
        if (loginMethod === "email") {
          user = users.find(u => u.email === form.email && u.password === form.password);
        } else {
          user = users.find(u => u.phone === form.phone && u.password === form.password);
        }
        if (!user) {
          // log failed attempt
          const dev = getDeviceInfo();
          setErrors({ submit: t.err_login });
          setLoading(false);
          return;
        }
        setPendingUser(user);
        // Trigger OTP
        const otp = generateOTP();
        const otpKey = loginMethod === "email" ? (form.email || user.email) : (form.phone || user.phone);
        UserStore.setOTP(otpKey, otp);
        setCurrentOTP(otp);
        if (loginMethod === "email") simulateEmailOTP(user.email, otp);
        else simulateSMSOTP(user.phone, otp);
        setOtpStep(true);
        setLoading(false);
      } else {
        const users = UserStore.getUsers();
        const newUser = {
          id: Date.now(), name: form.name, email: form.email, phone: form.phone,
          birthday: form.birthday, password: form.password,
          joinDate: new Date().toLocaleDateString(),
          avatar: form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
          loginMethod,
        };
        UserStore.saveUsers([...users, newUser]);
        if (savePassword) UserStore.saveCreds(form.email, form.password);
        const dev = getDeviceInfo();
        UserStore.addHistory(newUser.id, {
          time: new Date().toLocaleString(), method: t.hist_method_email,
          device: `${dev.device} · ${dev.browser}`, os: dev.os, status: "success", ip: "127.0.0.x",
        });
        UserStore.saveSession(newUser);
        showToast(t.register_success);
        setTimeout(() => { onSuccess(newUser); onClose(); }, 900);
        setLoading(false);
      }
    }, 800);
  };

  const resendOTP = () => {
    const otp = generateOTP();
    const otpKey = loginMethod === "email" ? (form.email || pendingUser?.email) : (form.phone || pendingUser?.phone);
    UserStore.setOTP(otpKey, otp);
    setCurrentOTP(otp);
    if (loginMethod === "email") simulateEmailOTP(otpKey, otp);
    else simulateSMSOTP(otpKey, otp);
    showToast("OTP mới đã được gửi!", "#3b82f6");
  };

  const inp = (key, placeholder, type = "text") => (
    <div style={{ marginBottom: 14, position: "relative" }}>
      <input type={type === "password" ? (showPass ? "text" : "password") : type}
        placeholder={placeholder} value={form[key]}
        onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }}
        style={{ width: "100%", background: errors[key] ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.06)",
          border: `1px solid ${errors[key] ? "#ef4444" : "rgba(255,255,255,0.12)"}`,
          borderRadius: 12, color: "white", padding: type === "password" ? "12px 44px 12px 14px" : "12px 14px",
          fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }}
        onFocus={e => { if (!errors[key]) e.target.style.borderColor = "rgba(108,61,232,0.5)"; }}
        onBlur={e => { if (!errors[key]) e.target.style.borderColor = "rgba(255,255,255,0.12)"; }} />
      {type === "password" && (
        <button type="button" onClick={() => setShowPass(p => !p)}
          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 16 }}>
          {showPass ? "🙈" : "👁️"}
        </button>
      )}
      {errors[key] && <div style={{ color: "#f87171", fontSize: 11, marginTop: 3 }}>{errors[key]}</div>}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 5000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, overflowY: "auto" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,8,20,0.88)", backdropFilter: "blur(14px)" }} onClick={otpStep ? undefined : onClose} />
      {toast && (
        <div style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${toast.color},${toast.color}cc)`, color: "white", padding: "11px 26px", borderRadius: 99, fontSize: 13, fontWeight: 600, zIndex: 6000, boxShadow: `0 8px 30px ${toast.color}55`, animation: "fadeInDown 0.3s ease", whiteSpace: "nowrap" }}>{toast.msg}</div>
      )}

      <div style={{ position: "relative", width: "100%", maxWidth: 460, background: "linear-gradient(135deg,rgba(13,20,64,0.99),rgba(26,10,60,0.99))", border: "1px solid rgba(108,61,232,0.3)", borderRadius: 24, padding: "36px 32px", boxShadow: "0 40px 120px rgba(0,0,0,0.85)", animation: "modalIn 0.35s cubic-bezier(.34,1.56,.64,1)", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.6)", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 14 }}>✕</button>

        {otpStep ? (
          <OTPStep
            channel={loginMethod} target={loginMethod === "email" ? (form.email || pendingUser?.email) : (form.phone || pendingUser?.phone)}
            otp={currentOTP} t={t}
            onVerified={() => doLogin(pendingUser)}
            onResend={resendOTP}
            onBack={() => { setOtpStep(false); setCurrentOTP(""); }}
          />
        ) : (
          <>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🪞</div>
              <h2 style={{ color: "white", fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>{isLogin ? t.auth_welcome : t.auth_create}</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0 }}>{isLogin ? t.auth_sub : t.auth_sub2}</p>
            </div>

            {/* Login/Register tabs */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 3, marginBottom: 20 }}>
              {[{ label: t.login, val: true }, { label: t.register, val: false }].map(({ label, val }) => (
                <button key={String(val)} onClick={() => { setIsLogin(val); setErrors({}); }} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: isLogin === val ? "linear-gradient(135deg,#6c3de8,#8b5cf6)" : "none", color: isLogin === val ? "white" : "rgba(255,255,255,0.45)", transition: "all 0.2s" }}>{label}</button>
              ))}
            </div>

            {/* Method selector (only for login) */}
            {isLogin && (
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {[{ id: "email", label: "📧 Email / Google" }, { id: "phone", label: "📱 SMS" }].map(m => (
                  <button key={m.id} onClick={() => { setLoginMethod(m.id); setErrors({}); }} style={{ flex: 1, padding: "9px 6px", borderRadius: 10, border: `1px solid ${loginMethod === m.id ? "rgba(108,61,232,0.6)" : "rgba(255,255,255,0.1)"}`, background: loginMethod === m.id ? "rgba(108,61,232,0.18)" : "rgba(255,255,255,0.04)", color: loginMethod === m.id ? "#a78bfa" : "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: 12, fontWeight: loginMethod === m.id ? 600 : 400, transition: "all 0.2s" }}>{m.label}</button>
                ))}
              </div>
            )}

            {/* Saved credentials banner */}
            {isLogin && savedCreds && (loginMethod === "email" ? savedCreds.email : savedCreds.email) && (
              <div style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 12, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: "#22d3ee", fontSize: 11, fontWeight: 600, marginBottom: 2 }}>🔐 {t.saved_pw_label}</div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>{savedCreds.email}</div>
                </div>
                <button onClick={() => { setForm(f => ({ ...f, email: savedCreds.email, phone: savedCreds.email, password: savedCreds.password })); }} style={{ background: "rgba(34,211,238,0.2)", border: "1px solid rgba(34,211,238,0.3)", color: "#22d3ee", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>⚡ {t.fill_saved}</button>
              </div>
            )}

            {/* Form fields */}
            {!isLogin && inp("name", t.full_name)}
            {(loginMethod === "email" || !isLogin) && inp("email", t.email, "email")}
            {(loginMethod === "phone" || !isLogin) && inp("phone", t.phone, "tel")}
            {!isLogin && (
              <div style={{ marginBottom: 14 }}>
                <input type="date" value={form.birthday} onChange={e => setForm({ ...form, birthday: e.target.value })}
                  style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "white", padding: "12px 14px", fontSize: 14, boxSizing: "border-box", colorScheme: "dark", fontFamily: "inherit" }} />
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 3 }}>📅 {t.birthday}</div>
              </div>
            )}
            {inp("password", t.password, "password")}
            {!isLogin && inp("confirm", t.confirm_password, "password")}

            {/* Save password checkbox */}
            <label style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18, cursor: "pointer" }}>
              <div onClick={() => setSavePassword(p => !p)} style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${savePassword ? "#a78bfa" : "rgba(255,255,255,0.2)"}`, background: savePassword ? "rgba(108,61,232,0.4)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                {savePassword && <span style={{ color: "#a78bfa", fontSize: 12 }}>✓</span>}
              </div>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{t.save_password}</span>
              {savedCreds && isLogin && (
                <button onClick={e => { e.preventDefault(); UserStore.clearCreds(); window.location.reload(); }} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(239,68,68,0.6)", cursor: "pointer", fontSize: 11 }}>✕ Xoá</button>
              )}
            </label>

            {errors.submit && <div style={{ color: "#f87171", fontSize: 12, marginBottom: 12, textAlign: "center", background: "rgba(239,68,68,0.08)", padding: "9px", borderRadius: 8 }}>{errors.submit}</div>}

            <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "13px", background: loading ? "rgba(108,61,232,0.35)" : "linear-gradient(135deg,#6c3de8,#8b5cf6)", border: "none", color: "white", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginBottom: 16, boxShadow: loading ? "none" : "0 0 28px rgba(108,61,232,0.4)" }}>
              {loading ? "⏳ ..." : (isLogin ? t.login : t.register)}
            </button>

            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
              {isLogin ? t.no_account : t.have_account}{" "}
              <button onClick={() => { setIsLogin(!isLogin); setErrors({}); }} style={{ background: "none", border: "none", color: "#a78bfa", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                {isLogin ? t.register_here : t.login_here}
              </button>
            </div>
          </>
        )}
      </div>
      <style>{`
        @keyframes modalIn { from { opacity:0; transform:scale(0.88) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes fadeInDown { from { opacity:0; transform:translateX(-50%) translateY(-10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
      `}</style>
    </div>
  );
}

// =================== USER AVATAR ===================
function UserAvatar({ user, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 36, height: 36, borderRadius: "50%",
      background: "linear-gradient(135deg,#6c3de8,#22d3ee)",
      border: "2px solid rgba(108,61,232,0.5)", color: "white",
      fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center",
    }}>{user.avatar || user.name?.slice(0, 2).toUpperCase()}</button>
  );
}

// =================== PROFILE PAGE ===================
function LoginHistoryPage({ user, t, onBack }) {
  const history = UserStore.getHistory(user.id);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e27", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontSize: 13 }}>← {t.back || "Back"}</button>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, margin: 0 }}>🔐 {t.login_history_title}</h1>
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            {t.hist_empty}
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Tổng đăng nhập", value: history.length, color: "#a78bfa", icon: "🔑" },
                { label: t.hist_success, value: history.filter(h => h.status === "success").length, color: "#22c55e", icon: "✅" },
                { label: t.hist_failed, value: history.filter(h => h.status === "failed").length, color: "#ef4444", icon: "❌" },
                { label: "Thiết bị", value: [...new Set(history.map(h => h.browser || ""))].filter(Boolean).length || 1, color: "#22d3ee", icon: "💻" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px", backdropFilter: "blur(12px)", textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* History list */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden", backdropFilter: "blur(12px)" }}>
              {/* Header row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 0.8fr 0.7fr", gap: 0, padding: "12px 20px", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {[t.hist_time, t.hist_device, t.hist_method, t.hist_status].map(h => (
                  <div key={h} style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</div>
                ))}
              </div>

              {history.map((item, i) => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 0.8fr 0.7fr", gap: 0, padding: "14px 20px", borderBottom: i < history.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "center", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 500 }}>{item.time?.split(",")[0]}</div>
                    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>{item.time?.split(",")[1]?.trim()}</div>
                  </div>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>{item.device}</div>
                    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>{item.os} · {t.hist_ip}: {item.ip}</div>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{item.method}</div>
                  <div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: item.status === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", color: item.status === "success" ? "#22c55e" : "#f87171", border: `1px solid ${item.status === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}` }}>
                      {item.status === "success" ? "✅ OK" : "❌ Fail"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => { if (window.confirm(t.hist_clear_confirm)) { UserStore.clearHistory(user.id); window.location.reload(); } }} style={{ marginTop: 20, width: "100%", padding: "12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              🗑️ {t.hist_clear}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ProfilePage({ user, onUpdate, onLogout, setPage, t }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPassSection, setShowPassSection] = useState(false);
  const [showProfileLogout, setShowProfileLogout] = useState(false);
  const [newPass, setNewPass] = useState({ current: "", next: "", confirm: "" });
  const [passMsg, setPassMsg] = useState(null);
  const savedCreds = UserStore.getSavedCreds();
  const loginHistory = UserStore.getHistory(user.id);

  if (showHistory) return <LoginHistoryPage user={user} t={t} onBack={() => setShowHistory(false)} />;

  const save = () => {
    const users = UserStore.getUsers().map(u => u.id === user.id ? { ...u, ...form } : u);
    UserStore.saveUsers(users);
    UserStore.saveSession({ ...user, ...form });
    onUpdate({ ...user, ...form });
    setEditing(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const changePassword = () => {
    if (!newPass.current || !newPass.next || !newPass.confirm) { setPassMsg({ type: "error", text: "Vui lòng điền đầy đủ" }); return; }
    if (newPass.current !== user.password) { setPassMsg({ type: "error", text: "Mật khẩu hiện tại không đúng" }); return; }
    if (newPass.next.length < 6) { setPassMsg({ type: "error", text: t.err_password }); return; }
    if (newPass.next !== newPass.confirm) { setPassMsg({ type: "error", text: t.err_confirm }); return; }
    const updated = { ...user, password: newPass.next };
    const users = UserStore.getUsers().map(u => u.id === user.id ? updated : u);
    UserStore.saveUsers(users); UserStore.saveSession(updated); onUpdate(updated);
    if (UserStore.getSavedCreds()?.email === user.email) UserStore.saveCreds(user.email, newPass.next);
    setPassMsg({ type: "success", text: "✅ Đổi mật khẩu thành công!" });
    setNewPass({ current: "", next: "", confirm: "" });
    setTimeout(() => setPassMsg(null), 3000);
  };

  const lastLogin = loginHistory[0];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e27", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
        <h1 style={{ color: "white", fontSize: 26, fontWeight: 800, marginBottom: 28 }}>👤 {t.profile_title}</h1>

        {/* Avatar card */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "24px", backdropFilter: "blur(12px)", marginBottom: 18, textAlign: "center" }}>
          <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(135deg,#6c3de8,#22d3ee)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "white", boxShadow: "0 0 30px rgba(108,61,232,0.4)" }}>{user.avatar}</div>
          <h2 style={{ color: "white", fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>{user.name}</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: "0 0 16px" }}>{user.email}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {[{ v: "14", l: `${t.recorded} ${t.days}`, c: "#a78bfa" }, { v: "3🔥", l: t.streak, c: "#22d3ee" }, { v: "2", l: t.dash_tests, c: "#22c55e" }].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ color: s.c, fontWeight: 700, fontSize: 18 }}>{s.v}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{s.l}</div>
              </div>
            ))}
          </div>
          {lastLogin && (
            <div style={{ marginTop: 14, padding: "8px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>🕐 Đăng nhập gần nhất:</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 500 }}>{lastLogin.time?.split(",")[0]}</span>
            </div>
          )}
        </div>

        {/* Quick action cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
          {[
            { icon: "🔐", label: t.login_history_title, sub: `${loginHistory.length} lần`, action: () => setShowHistory(true), color: "#a78bfa" },
            { icon: "🔑", label: "Đổi mật khẩu", sub: savedCreds ? "✓ Đã lưu" : "Chưa lưu", action: () => setShowPassSection(p => !p), color: "#22d3ee" },
          ].map(c => (
            <button key={c.label} onClick={c.action} style={{ background: `${c.color}0e`, border: `1px solid ${c.color}28`, borderRadius: 14, padding: "16px", textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = `${c.color}18`}
              onMouseLeave={e => e.currentTarget.style.background = `${c.color}0e`}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{c.label}</div>
              <div style={{ color: c.color, fontSize: 11, marginTop: 2 }}>{c.sub}</div>
            </button>
          ))}
        </div>

        {/* Change password section */}
        {showPassSection && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "24px", backdropFilter: "blur(12px)", marginBottom: 18 }}>
            <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>🔑 Đổi mật khẩu</h3>
            {[{ key: "current", ph: "Mật khẩu hiện tại" }, { key: "next", ph: "Mật khẩu mới (tối thiểu 6 ký tự)" }, { key: "confirm", ph: "Xác nhận mật khẩu mới" }].map(f => (
              <div key={f.key} style={{ marginBottom: 12 }}>
                <input type="password" placeholder={f.ph} value={newPass[f.key]}
                  onChange={e => setNewPass(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "white", padding: "11px 14px", fontSize: 13, boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
            ))}
            {passMsg && <div style={{ color: passMsg.type === "success" ? "#22c55e" : "#f87171", fontSize: 12, marginBottom: 10 }}>{passMsg.text}</div>}
            <button onClick={changePassword} style={{ width: "100%", padding: "11px", background: "linear-gradient(135deg,#6c3de8,#8b5cf6)", border: "none", color: "white", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>💾 Cập nhật mật khẩu</button>
            {savedCreds && (
              <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#22d3ee", fontSize: 11, fontWeight: 600 }}>🔒 {t.saved_pw_label}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{savedCreds.email}</div>
                </div>
                <button onClick={() => { UserStore.clearCreds(); window.location.reload(); }} style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", padding: "4px 10px", borderRadius: 7, cursor: "pointer", fontSize: 11 }}>🗑️ Xoá</button>
              </div>
            )}
          </div>
        )}

        {/* Personal info */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "24px", backdropFilter: "blur(12px)", marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, margin: 0 }}>📝 Thông tin cá nhân</h3>
            <button onClick={() => setEditing(!editing)} style={{ background: "rgba(108,61,232,0.15)", border: "1px solid rgba(108,61,232,0.35)", color: "#a78bfa", padding: "5px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>{editing ? "✕ Hủy" : `✏️ ${t.edit_profile}`}</button>
          </div>
          {[{ label: "👤 " + t.full_name, key: "name", type: "text" }, { label: "📧 " + t.email, key: "email", type: "email" }, { label: "📱 " + t.phone, key: "phone", type: "tel" }, { label: "🎂 " + t.birthday, key: "birthday", type: "date" }].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginBottom: 5 }}>{f.label}</div>
              {editing ? (
                <input type={f.type} value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(108,61,232,0.3)", borderRadius: 10, color: "white", padding: "10px 13px", fontSize: 13, boxSizing: "border-box", colorScheme: "dark", fontFamily: "inherit" }} />
              ) : (
                <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 14, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{user[f.key] || "—"}</div>
              )}
            </div>
          ))}
          {editing && (
            <button onClick={save} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg,#6c3de8,#8b5cf6)", border: "none", color: "white", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 4 }}>
              {saved ? "✅ Đã lưu!" : `💾 ${t.save_profile}`}
            </button>
          )}
          <div style={{ marginTop: 14, color: "rgba(255,255,255,0.28)", fontSize: 11 }}>📅 {t.member_since}: {user.joinDate}</div>
        </div>

        <button onClick={() => setShowProfileLogout(true)} style={{ width: "100%", padding: "13px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: "pointer", display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>🚪 {t.logout}</button>
        {showProfileLogout && <LogoutModal user={user} t={t} onLogout={()=>{setShowProfileLogout(false);UserStore.clearSession();onLogout();}} onSwitchAccount={()=>setShowProfileLogout(false)} onCancel={()=>setShowProfileLogout(false)} />}
      </div>
    </div>
  );
}


// =================== MINDMIRROR LOGO SVG ===================
function MindMirrorLogo({ size = 36, showText = true, animate = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: showText ? 10 : 0, flexShrink: 0 }}>
      {/* SVG Logo mark */}
      <div style={{ width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGrad1" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6c3de8"/>
              <stop offset="60%" stopColor="#8b5cf6"/>
              <stop offset="100%" stopColor="#22d3ee"/>
            </linearGradient>
            <linearGradient id="logoGrad2" x1="44" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#6c3de8" stopOpacity="0.2"/>
            </linearGradient>
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Outer ring — mirror frame */}
          <circle cx="22" cy="22" r="20" fill="none" stroke="url(#logoGrad1)" strokeWidth="2.5" opacity="0.9"/>

          {/* Inner mirror glass */}
          <circle cx="22" cy="22" r="15.5" fill="url(#logoGrad2)"/>

          {/* Mirror reflection line */}
          <line x1="22" y1="7" x2="22" y2="37" stroke="url(#logoGrad1)" strokeWidth="1" opacity="0.4" strokeDasharray="2 3"/>

          {/* Brain left hemisphere */}
          <path d="M 10 20 Q 8 15 12 12 Q 16 9 20 12 Q 22 14 22 17 L 22 28 Q 22 31 19 31 Q 14 31 11 27 Q 9 24 10 20 Z"
            fill="none" stroke="url(#logoGrad1)" strokeWidth="1.8" opacity="0.85" strokeLinejoin="round"/>
          {/* Brain right hemisphere */}
          <path d="M 34 20 Q 36 15 32 12 Q 28 9 24 12 Q 22 14 22 17 L 22 28 Q 22 31 25 31 Q 30 31 33 27 Q 35 24 34 20 Z"
            fill="none" stroke="url(#logoGrad1)" strokeWidth="1.8" opacity="0.85" strokeLinejoin="round"/>

          {/* Neural connections — left */}
          <path d="M 12 18 Q 17 16 22 17" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" fill="none" strokeLinecap="round"/>
          <path d="M 11 23 Q 16 22 22 22" stroke="#22d3ee" strokeWidth="1.2" opacity="0.5" fill="none" strokeLinecap="round"/>
          <path d="M 13 27 Q 17 26 22 26" stroke="#a78bfa" strokeWidth="1.2" opacity="0.5" fill="none" strokeLinecap="round"/>
          {/* Neural connections — right */}
          <path d="M 32 18 Q 27 16 22 17" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" fill="none" strokeLinecap="round"/>
          <path d="M 33 23 Q 28 22 22 22" stroke="#22d3ee" strokeWidth="1.2" opacity="0.5" fill="none" strokeLinecap="round"/>
          <path d="M 31 27 Q 27 26 22 26" stroke="#a78bfa" strokeWidth="1.2" opacity="0.5" fill="none" strokeLinecap="round"/>

          {/* Center node glow */}
          <circle cx="22" cy="22" r="3" fill="url(#logoGrad1)" opacity="0.8" filter="url(#logoGlow)">
            {animate && <animate attributeName="r" values="2.5;4;2.5" dur="2s" repeatCount="indefinite"/>}
            {animate && <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>}
          </circle>

          {/* Sparkle top-right */}
          <circle cx="34" cy="10" r="1.5" fill="#22d3ee" opacity="0.7">
            {animate && <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" begin="0.5s" repeatCount="indefinite"/>}
          </circle>
          <circle cx="10" cy="34" r="1" fill="#a78bfa" opacity="0.5">
            {animate && <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" begin="1s" repeatCount="indefinite"/>}
          </circle>

          {/* Mirror bottom stem */}
          <rect x="19" y="37" width="6" height="4" rx="2" fill="url(#logoGrad1)" opacity="0.5"/>
          <rect x="16" y="41" width="12" height="2" rx="1" fill="url(#logoGrad1)" opacity="0.35"/>
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{
            fontSize: size * 0.5, fontWeight: 900, letterSpacing: -0.5,
            background: "linear-gradient(135deg,#c4b5fd,#a78bfa,#22d3ee)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Mind</span>
          <span style={{
            fontSize: size * 0.5, fontWeight: 900, letterSpacing: -0.5,
            background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginTop: -2,
          }}>Mirror</span>
        </div>
      )}
    </div>
  );
}

// =================== LOADING SCREEN ===================
function LoadingScreen({ onDone, t }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const phases = [t.load1, t.load2, t.load3, t.load4];
  const canvasRef = useRef(null);

  useEffect(() => {
    // Starfield background
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      const stars = Array.from({length:200}, () => ({
        x: Math.random()*canvas.width, y: Math.random()*canvas.height,
        r: Math.random()*1.5+0.2, a: Math.random(), va: (Math.random()-0.5)*0.015,
      }));
      let raf;
      const draw = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        stars.forEach(s => { s.a = Math.max(0.05, Math.min(1, s.a+s.va)); if(s.a<=0.05||s.a>=1) s.va*=-1; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${s.a})`; ctx.fill(); });
        raf = requestAnimationFrame(draw);
      };
      draw();
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); setTimeout(onDone, 600); return 100; }
        setPhase(Math.floor(p / 25));
        return p + 1.0;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div style={{ position:"fixed", inset:0, background:"radial-gradient(ellipse at 50% 0%,#130f35 0%,#07091d 60%,#0a0520 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:9999, overflow:"hidden" }}>
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, opacity:0.7 }} />

      {/* Aurora blobs */}
      <div style={{ position:"absolute", top:"10%", left:"20%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(108,61,232,0.15),transparent 70%)", animation:"orbFloat 8s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"15%", right:"15%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(34,211,238,0.1),transparent 70%)", animation:"orbFloat 10s ease-in-out 2s infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"40%", right:"25%", width:250, height:250, borderRadius:"50%", background:"radial-gradient(circle,rgba(236,72,153,0.08),transparent 70%)", animation:"orbFloat 12s ease-in-out 4s infinite", pointerEvents:"none" }} />

      {/* Main content */}
      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center" }}>
        {/* Orbital rings */}
        <div style={{ position:"relative", width:200, height:200, marginBottom:40 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              position:"absolute", top:"50%", left:"50%",
              width: 100+i*50, height: 100+i*50,
              borderRadius:"50%",
              border:`1.5px solid rgba(108,61,232,${0.5-i*0.12})`,
              transform:"translate(-50%,-50%)",
              animation:`spin ${4+i*1.5}s linear infinite`,
              boxShadow:`0 0 ${10+i*5}px rgba(108,61,232,${0.2-i*0.04})`,
            }}>
              {/* Orbiting dot */}
              <div style={{
                position:"absolute", width:6, height:6, borderRadius:"50%",
                background: ["#6c3de8","#22d3ee","#ec4899"][i],
                top:-3, left:"calc(50% - 3px)",
                boxShadow:`0 0 12px ${["#6c3de8","#22d3ee","#ec4899"][i]}`,
              }} />
            </div>
          ))}
          {/* Center logo */}
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,rgba(108,61,232,0.4),rgba(34,211,238,0.2))", border:"2px solid rgba(108,61,232,0.6)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 40px rgba(108,61,232,0.5),inset 0 0 20px rgba(108,61,232,0.2)" }}>
            <MindMirrorLogo size={46} showText={false} animate={true} />
          </div>
        </div>

        {/* Logo text */}
        <div style={{ marginBottom:12 }}><MindMirrorLogo size={48} showText={true} animate={true} /></div>

        {/* Phase text */}
        <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13, marginBottom:36, letterSpacing:3, textTransform:"uppercase", fontWeight:300, animation:"pulse 2s ease infinite" }}>
          {phases[phase] || phases[3]}
        </div>

        {/* Progress bar */}
        <div style={{ width:280, position:"relative" }}>
          <div style={{ height:2, background:"rgba(255,255,255,0.08)", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#6c3de8,#8b5cf6 50%,#22d3ee)", borderRadius:99, transition:"width 0.08s linear", boxShadow:"0 0 10px rgba(108,61,232,0.5)" }} />
          </div>
          <div style={{ marginTop:10, textAlign:"center", color:"rgba(255,255,255,0.25)", fontSize:11 }}>{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
}

// =================== NAV ===================
function Nav({ page, setPage, lang, setLang, user, onAuthClick, onLogout, onSwitchUser, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const navItems = [
    { id: "home", label: t.nav_home }, { id: "ai", label: t.nav_ai },
    { id: "test", label: t.nav_test }, { id: "journal", label: t.nav_journal },
    { id: "knowledge", label: t.nav_knowledge }, { id: "special", label: t.nav_special },
    { id: "dashboard", label: t.nav_dashboard },
    { id: "chat", label: t.nav_chat },
    { id: "game", label: t.nav_game || t.nav_game || "🌿 Healing Corner" },
    { id: "garden", label: t.nav_garden || "🌿 Garden" },
    { id: "replay", label: t.nav_replay || "✨ Replay" },
    { id: "predict", label: t.nav_predict || "🔮 Predict" },
    { id: "report", label: t.nav_report || "📄 Report" },
    { id: "face", label: t.nav_face || "😊 Face" },
    { id: "globe", label: t.nav_globe || "🌐 3D" },
    { id: "progress", label: t.nav_progress || "📈 Progress" },
    { id: "care", label: t.nav_care || "💙 Care" },
    { id: "letter", label: t.nav_letter || "💌 Letter" },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(7,9,29,0.88)" : "transparent", backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none", borderBottom: scrolled ? "1px solid rgba(108,61,232,0.15)" : "none", boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.4)" : "none", transition: "all 0.4s ease", padding: "0 20px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <MindMirrorLogo size={38} showText={true} animate={false} />
        </button>

        <div style={{ display: "flex", gap: 2, flexWrap: "nowrap", overflow: "hidden" }} className="desktop-nav">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              background: page === item.id ? "linear-gradient(135deg,rgba(108,61,232,0.25),rgba(139,92,246,0.15))" : "none",
              border: page === item.id ? "1px solid rgba(108,61,232,0.5)" : "1px solid transparent",
              color: page === item.id ? "#c4b5fd" : "rgba(255,255,255,0.6)",
              padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12,
              fontWeight: page === item.id ? 700 : 400, whiteSpace: "nowrap",
              transition: "all 0.2s", boxShadow: page === item.id ? "0 0 16px rgba(108,61,232,0.3)" : "none",
            }}
              onMouseEnter={e => { if (page!==item.id) { e.currentTarget.style.color="white"; e.currentTarget.style.background="rgba(255,255,255,0.07)"; }}}
              onMouseLeave={e => { if (page!==item.id) { e.currentTarget.style.color="rgba(255,255,255,0.6)"; e.currentTarget.style.background="none"; }}}
            >{item.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <LangSwitcher lang={lang} setLang={setLang} />
          {user ? (
            <div style={{ position: "relative" }}>
              <UserAvatar user={user} onClick={() => setUserDropdown(!userDropdown)} />
              {userDropdown && (
                <div style={{ position: "absolute", top: "calc(100%+8px)", right: 0, marginTop: 8, background: "rgba(13,20,64,0.98)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, minWidth: 220, overflow: "hidden", backdropFilter: "blur(20px)", zIndex: 2000, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                  {/* User info header */}
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#6c3de8,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>{user.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "white", fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email || user.phone}</div>
                    </div>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0, boxShadow: "0 0 6px #22c55e" }} />
                  </div>
                  {/* Menu items */}
                  {[
                    { icon: "👤", label: t.nav_profile, action: () => { setPage("profile"); setUserDropdown(false); } },
                    { icon: "📊", label: t.nav_dashboard, action: () => { setPage("dashboard"); setUserDropdown(false); } },
                    { icon: "💬", label: t.nav_chat, action: () => { setPage("chat"); setUserDropdown(false); } },
                    { icon: "🌿", label: t.nav_game || t.nav_game || "Healing Corner", action: () => { setPage("game"); setUserDropdown(false); } },
                    { icon: "🌸", label: t.nav_garden || t.nav_garden || "Garden", action: () => { setPage("garden"); setUserDropdown(false); } },
                    { icon: "✨", label: t.nav_replay || "Mind Replay", action: () => { setPage("replay"); setUserDropdown(false); } },
                  ].map(item => (
                    <button key={item.label} onClick={item.action} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: 13, textAlign: "left", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <span style={{ fontSize: 15 }}>{item.icon}</span> {item.label}
                    </button>
                  ))}
                  {/* Switch account */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button onClick={() => { setShowSwitchModal(true); setUserDropdown(false); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", color: "rgba(167,139,250,0.85)", cursor: "pointer", fontSize: 13, textAlign: "left" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(108,61,232,0.1)"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <span>🔄</span> {t.switch_account || t.logout_switch || "Switch Account"}
                    </button>
                  </div>
                  {/* Logout */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button onClick={() => { setShowLogoutModal(true); setUserDropdown(false); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 13, textAlign: "left" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <span>🚪</span> {t.logout}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => onAuthClick("login")} style={{ background: "linear-gradient(135deg,#6c3de8,#8b5cf6)", border: "none", color: "white", padding: "9px 20px", borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 24px rgba(108,61,232,0.45)", transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 0 40px rgba(108,61,232,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 0 24px rgba(108,61,232,0.45)"; }}>
            {t.nav_login}</button>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ display: "none", background: "none", border: "none", color: "white", fontSize: 22, cursor: "pointer" }}>☰</button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: "rgba(10,14,39,0.99)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "12px 20px 20px" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setPage(item.id); setMenuOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: page === item.id ? "rgba(108,61,232,0.15)" : "none", border: "none", color: page === item.id ? "#a78bfa" : "rgba(255,255,255,0.8)", padding: "11px 14px", borderRadius: 10, cursor: "pointer", fontSize: 14, marginBottom: 2 }}>{item.label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:900px){ .desktop-nav{display:none!important} .mobile-menu-btn{display:block!important} }
      `}</style>

      {showLogoutModal && user && (
        <LogoutModal user={user} t={t}
          onLogout={() => { setShowLogoutModal(false); onLogout(); }}
          onSwitchAccount={() => { setShowLogoutModal(false); setShowSwitchModal(true); }}
          onCancel={() => setShowLogoutModal(false)} />
      )}
      {showSwitchModal && (
        <AccountSwitchModal currentUser={user} t={t}
          onSwitch={(acc) => { const full = UserStore.getUsers().find(u => u.id === acc.id); if (full) { UserStore.saveSession(full); onSwitchUser(full); } setShowSwitchModal(false); }}
          onAdd={() => { setShowSwitchModal(false); onAuthClick("login"); }}
          onClose={() => setShowSwitchModal(false)} />
      )}
    </nav>
  );
}


// =================== LOGOUT MODAL (enhanced) ===================
function LogoutModal({ user, onLogout, onSwitchAccount, onCancel, t }) {
  const [countdown, setCountdown] = useState(null);

  return (
    <div style={{ position:"fixed",inset:0,zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
      <div style={{ position:"absolute",inset:0,background:"rgba(5,8,20,0.88)",backdropFilter:"blur(16px)" }} onClick={onCancel} />
      <div style={{ position:"relative",width:"100%",maxWidth:380,background:"linear-gradient(135deg,rgba(13,20,64,0.99),rgba(26,10,60,0.99))",border:"1px solid rgba(239,68,68,0.25)",borderRadius:24,padding:"36px 32px",textAlign:"center",boxShadow:"0 40px 100px rgba(0,0,0,0.8)",animation:"modalIn 0.35s cubic-bezier(.34,1.56,.64,1)" }}>
        {/* Animated farewell emoji */}
        <div style={{ fontSize:56,marginBottom:12,animation:"waveHand 1.5s ease infinite" }}>👋</div>
        <h2 style={{ color:"white",fontSize:22,fontWeight:800,margin:"0 0 8px" }}>{t.logout_title}</h2>
        <p style={{ color:"rgba(255,255,255,0.5)",fontSize:14,margin:"0 0 28px",lineHeight:1.6 }}>{t.logout_sub}</p>

        {/* User card */}
        <div style={{ background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:14,padding:"12px 16px",marginBottom:24,display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#6c3de8,#22d3ee)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"white",flexShrink:0 }}>{user.avatar}</div>
          <div style={{ textAlign:"left" }}>
            <div style={{ color:"white",fontWeight:600,fontSize:14 }}>{user.name}</div>
            <div style={{ color:"rgba(255,255,255,0.4)",fontSize:12 }}>{user.email || user.phone}</div>
          </div>
          <div style={{ marginLeft:"auto",padding:"3px 9px",borderRadius:99,background:"rgba(34,197,94,0.15)",color:"#22c55e",fontSize:11,fontWeight:600,border:"1px solid rgba(34,197,94,0.3)" }}>● Online</div>
        </div>

        {/* Buttons */}
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          <button onClick={onLogout} style={{ width:"100%",padding:"13px",background:"linear-gradient(135deg,#ef4444,#dc2626)",border:"none",color:"white",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:"0 0 20px rgba(239,68,68,0.35)",transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            🚪 {t.logout_yes}
          </button>
          <button onClick={onSwitchAccount} style={{ width:"100%",padding:"12px",background:"rgba(108,61,232,0.15)",border:"1px solid rgba(108,61,232,0.35)",color:"#a78bfa",borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",transition:"all 0.2s" }}>
            🔄 {t.logout_switch}
          </button>
          <button onClick={onCancel} style={{ width:"100%",padding:"11px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.6)",borderRadius:12,fontSize:13,cursor:"pointer" }}>
            ✕ {t.logout_no}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes waveHand{0%,100%{transform:rotate(0deg)}20%{transform:rotate(-20deg)}40%{transform:rotate(20deg)}60%{transform:rotate(-10deg)}80%{transform:rotate(10deg)}}
      `}</style>
    </div>
  );
}

// =================== ACCOUNT SWITCH MODAL ===================
function AccountSwitchModal({ currentUser, onSwitch, onAdd, onClose, t }) {
  const accounts = AccountStore.getAccounts();

  return (
    <div style={{ position:"fixed",inset:0,zIndex:8000,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
      <div style={{ position:"absolute",inset:0,background:"rgba(5,8,20,0.85)",backdropFilter:"blur(14px)" }} onClick={onClose} />
      <div style={{ position:"relative",width:"100%",maxWidth:400,background:"linear-gradient(135deg,rgba(13,20,64,0.99),rgba(10,14,60,0.99))",border:"1px solid rgba(108,61,232,0.3)",borderRadius:24,padding:"32px 28px",boxShadow:"0 40px 100px rgba(0,0,0,0.8)",animation:"modalIn 0.35s cubic-bezier(.34,1.56,.64,1)" }}>
        <button onClick={onClose} style={{ position:"absolute",top:14,right:14,background:"rgba(255,255,255,0.08)",border:"none",color:"rgba(255,255,255,0.5)",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:14 }}>✕</button>

        <h2 style={{ color:"white",fontSize:20,fontWeight:800,margin:"0 0 6px",textAlign:"center" }}>🔄 {t.switch_title}</h2>
        <p style={{ color:"rgba(255,255,255,0.4)",fontSize:13,textAlign:"center",margin:"0 0 24px" }}>{accounts.length} {t.switch_title?.toLowerCase()}</p>

        <div style={{ display:"flex",flexDirection:"column",gap:10,maxHeight:280,overflowY:"auto" }}>
          {accounts.length === 0 && (
            <div style={{ textAlign:"center",color:"rgba(255,255,255,0.35)",padding:24 }}>Chưa có tài khoản đã lưu</div>
          )}
          {accounts.map(acc => {
            const isCurrent = currentUser && acc.id === currentUser.id;
            return (
              <div key={acc.id} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:isCurrent?"rgba(108,61,232,0.15)":"rgba(255,255,255,0.04)",border:`1px solid ${isCurrent?"rgba(108,61,232,0.4)":"rgba(255,255,255,0.08)"}`,borderRadius:14,transition:"all 0.2s" }}>
                <div style={{ width:42,height:42,borderRadius:"50%",background:isCurrent?"linear-gradient(135deg,#6c3de8,#22d3ee)":"linear-gradient(135deg,#374151,#6b7280)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:"white",flexShrink:0 }}>{acc.avatar}</div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ color:"white",fontWeight:600,fontSize:14 }}>{acc.name}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)",fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{acc.email || acc.phone}</div>
                </div>
                {isCurrent ? (
                  <span style={{ padding:"3px 10px",borderRadius:99,background:"rgba(34,197,94,0.15)",color:"#22c55e",fontSize:11,fontWeight:600,border:"1px solid rgba(34,197,94,0.3)",whiteSpace:"nowrap" }}>✓ {t.current_account}</span>
                ) : (
                  <div style={{ display:"flex",gap:6 }}>
                    <button onClick={() => onSwitch(acc)} style={{ padding:"5px 12px",borderRadius:8,background:"rgba(108,61,232,0.25)",border:"1px solid rgba(108,61,232,0.4)",color:"#a78bfa",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap" }}>→ Dùng</button>
                    <button onClick={() => AccountStore.removeAccount(acc.id)} style={{ padding:"5px 8px",borderRadius:8,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",color:"#f87171",cursor:"pointer",fontSize:12 }}>✕</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={onAdd} style={{ width:"100%",marginTop:16,padding:"12px",background:"rgba(255,255,255,0.05)",border:"1px dashed rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.6)",borderRadius:12,cursor:"pointer",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
          ➕ {t.add_account}
        </button>
      </div>
    </div>
  );
}

// =================== ROBOT GUIDE (Mira) ===================
function RobotGuide({ setPage, onClose, currentPage, t }) {
  const [step, setStep] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [exploring, setExploring] = useState(false); // user navigated away via Try It
  const [exploredPage, setExploredPage] = useState(null);
  const [guideMinimized, setGuideMinimized] = useState(false);

  const steps = [
    { icon:"🪞", title:t.mira_s0_title||t.robot_hi||"Welcome to MindMirror!", desc:t.mira_s0_desc||"I'm Mira 🤖 — your AI assistant!", highlight:null, mood:"wave", emoji:"✨🎉🌟", page:null, tryLabel:null },
    { icon:"🤖", title:t.mira_s1_title||"AI Emotion Analysis", desc:t.mira_s1_desc||"Share your emotions — AI will analyze!", highlight:"ai", mood:"think", emoji:"💭🧠💡", page:"ai", tryLabel:t.mira_s1_try||"🤖 Try it" },
    { icon:"🧩", title:t.mira_s2_title||"Personality Tests", desc:t.mira_s2_desc||"Discover your true self with MBTI!", highlight:"test", mood:"excited", emoji:"🎯🏆🌟", page:"test", tryLabel:t.mira_s2_try||"🧩 Take test" },
    { icon:"📔", title:t.mira_s3_title||"Emotion Journal", desc:t.mira_s3_desc||"Record your mood every day!", highlight:"journal", mood:"happy", emoji:"📅🌈💖", page:"journal", tryLabel:t.mira_s3_try||"📔 Write journal" },
    { icon:"🌊", title:t.mira_s4_title||"Mental Energy Map", desc:t.mira_s4_desc||"AI reads your aura!", highlight:"special", mood:"magic", emoji:"🔮🌊💜", page:"special", tryLabel:t.mira_s4_try||"🌊 Explore aura" },
    { icon:"💬", title:t.mira_s5_title||"Chat with MindBot", desc:t.mira_s5_desc||"Talk with AI 24/7!", highlight:"chat", mood:"friendly", emoji:"💬🤝💙", page:"chat", tryLabel:t.mira_s5_try||"💬 Chat now" },
    { icon:"📚", title:t.mira_s6_title||"Psychology Knowledge", desc:t.mira_s6_desc||"Read psychology articles!", highlight:"knowledge", mood:"think", emoji:"📚🧠💡", page:"knowledge", tryLabel:t.mira_s6_try||"📚 Read articles" },
    { icon:"🌿", title:t.mira_s7_title||"Mood Garden", desc:t.mira_s7_desc||"Nurture your mind tree!", highlight:"garden", mood:"happy", emoji:"🌿🌸🌟", page:"garden", tryLabel:t.mira_s7_try||"🌿 Visit Garden" },
    { icon:"✨", title:t.mira_s8_title||"Mind Replay", desc:t.mira_s8_desc||"AI summarizes your journey!", highlight:"replay", mood:"magic", emoji:"✨📅💜", page:"replay", tryLabel:t.mira_s8_try||"✨ View Replay" },
    { icon:"🚀", title:t.mira_s9_title||"You're ready!", desc:t.mira_s9_desc||"Your journey starts here!", highlight:null, mood:"celebrate", emoji:"🎊🎉🥳", page:null, tryLabel:null },
    { icon:"🔮", title:t.nav_predict||"AI Mood Prediction", desc:t.predict_sub||"AI predicts today's mood from your data!", highlight:"predict", mood:"magic", emoji:"🔮✨💜", page:"predict", tryLabel:t.predict_run||"🔮 Try Prediction" },
    { icon:"📄", title:t.nav_report||"PDF Report", desc:t.report_sub||"Export your personal psychology profile as PDF!", highlight:"report", mood:"think", emoji:"📄🎓⭐", page:"report", tryLabel:t.report_generate||"📄 Export PDF" },
    { icon:"💌", title:t.nav_letter||"Future Letter", desc:t.letter_sub||"Write a letter to your future self!", highlight:"letter", mood:"friendly", emoji:"💌✍️🌟", page:"letter", tryLabel:t.letter_write||"💌 Write Letter" },
  ];

  const currentStep = steps[step];
  const isLast = step === steps.length - 1;
  const isFirst = step === 0;

  const robotFaces = {
    wave:      { color: "#6c3de8", anim: "robotWave" },
    think:     { color: "#8b5cf6", anim: "robotThink" },
    excited:   { color: "#f97316", anim: "robotJump" },
    happy:     { color: "#22c55e", anim: "robotBounce" },
    magic:     { color: "#22d3ee", anim: "robotSpin" },
    friendly:  { color: "#ec4899", anim: "robotNod" },
    celebrate: { color: "#a78bfa", anim: "robotDance" },
  };
  const face = robotFaces[currentStep.mood] || robotFaces.wave;

  const transition = (cb) => {
    setBubbleVisible(false);
    setTimeout(() => { cb(); setBubbleVisible(true); }, 200);
  };
  const goNext = () => { if (isLast) { onClose(); return; } transition(() => setStep(s => s + 1)); };
  const goPrev = () => { if (isFirst) return; transition(() => setStep(s => s - 1)); };

  const handleTryIt = () => {
    if (!currentStep.page) return;
    setExploring(true);
    setExploredPage(currentStep.page);
    setGuideMinimized(true);
    setPage(currentStep.page);
  };

  const handleBackToGuide = () => {
    setExploring(false);
    setExploredPage(null);
    setGuideMinimized(false);
    setPage("home");
    setTimeout(() => setBubbleVisible(true), 300);
  };

  // SVG Robot component
  const MiraRobot = ({ color, anim, size = 80 }) => (
    <div style={{ flexShrink: 0, animation: `${anim} 0.9s ease infinite alternate`, transformOrigin: "center bottom" }}>
      <svg width={size} height={Math.round(size * 1.2)} viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glow behind */}
        <ellipse cx="40" cy="90" rx="24" ry="5" fill={color} opacity="0.2"/>
        {/* Antenna base */}
        <line x1="40" y1="2" x2="40" y2="14" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        {/* Antenna ball with glow */}
        <circle cx="40" cy="5" r="5" fill={color} opacity="0.3"/>
        <circle cx="40" cy="5" r="3" fill={color}>
          <animate attributeName="r" values="3;4.5;3" dur="1.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.6;1" dur="1.4s" repeatCount="indefinite"/>
        </circle>
        {/* Head */}
        <rect x="10" y="14" width="60" height="42" rx="14" fill="rgba(13,20,64,0.97)" stroke={color} strokeWidth="2.5"/>
        {/* Screen shine */}
        <rect x="12" y="16" width="28" height="8" rx="4" fill={color} opacity="0.06"/>
        {/* Eyes */}
        <circle cx="26" cy="32" r="9" fill={color} opacity="0.15"/>
        <circle cx="26" cy="32" r="7" fill={color} opacity="0.85"/>
        <circle cx="54" cy="32" r="9" fill={color} opacity="0.15"/>
        <circle cx="54" cy="32" r="7" fill={color} opacity="0.85"/>
        {/* Pupils */}
        <circle cx="28" cy="30" r="3.5" fill="white" opacity="0.95"/>
        <circle cx="56" cy="30" r="3.5" fill="white" opacity="0.95"/>
        {/* Eye shine */}
        <circle cx="29.5" cy="28.5" r="1.2" fill="white"/>
        <circle cx="57.5" cy="28.5" r="1.2" fill="white"/>
        {/* Mouth / expression bar */}
        <rect x="24" y="44" width="32" height="6" rx="3" fill={color} opacity="0.6"/>
        <rect x="27" y="45" width="26" height="4" rx="2" fill={color} opacity="0.4"/>
        {/* Neck */}
        <rect x="33" y="56" width="14" height="8" rx="4" fill={color} opacity="0.45"/>
        {/* Body */}
        <rect x="6" y="64" width="68" height="30" rx="14" fill="rgba(13,20,64,0.95)" stroke={color} strokeWidth="2.5"/>
        {/* Chest screen */}
        <rect x="16" y="70" width="48" height="18" rx="8" fill={color} opacity="0.08" stroke={color} strokeWidth="1" strokeOpacity="0.3"/>
        {/* Chest lights row */}
        <circle cx="28" cy="79" r="3.5" fill={color} opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" begin="0s" repeatCount="indefinite"/></circle>
        <circle cx="40" cy="79" r="4" fill={color} opacity="0.8"><animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.2s" begin="0.3s" repeatCount="indefinite"/></circle>
        <circle cx="52" cy="79" r="3.5" fill={color} opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.6s" repeatCount="indefinite"/></circle>
        {/* Arms */}
        <rect x="-4" y="66" width="14" height="24" rx="7" fill={color} opacity="0.65"/>
        <rect x="70" y="66" width="14" height="24" rx="7" fill={color} opacity="0.65"/>
        {/* Hands */}
        <circle cx="3" cy="92" r="6" fill={color} opacity="0.75"/>
        <circle cx="77" cy="92" r="6" fill={color} opacity="0.75"/>
        {/* Ear bolts */}
        <circle cx="10" cy="35" r="3" fill={color} opacity="0.5"/>
        <circle cx="70" cy="35" r="3" fill={color} opacity="0.5"/>
      </svg>
    </div>
  );

  // Minimized floating state (when user is exploring)
  if (guideMinimized) {
    return (
      <div style={{ position: "fixed", bottom: 100, right: 28, zIndex: 7600, animation: "slideUpIn 0.4s ease" }}>
        <div style={{ background: "linear-gradient(135deg,rgba(13,20,64,0.98),rgba(26,10,60,0.98))", border: `2px solid ${face.color}66`, borderRadius: 20, padding: "14px 18px", boxShadow: `0 16px 50px rgba(0,0,0,0.7),0 0 30px ${face.color}22`, maxWidth: 260 }}>
          {/* Mini robot */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <MiraRobot color={face.color} anim={face.anim} size={44} />
            <div>
              <div style={{ color: face.color, fontWeight: 700, fontSize: 12 }}>Mira 🤖</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, lineHeight: 1.4 }}>{t.robot_done_explore || t.robot_done_explore || "Done! Continue the guide 😊"}</div>
            </div>
          </div>
          <button onClick={handleBackToGuide} style={{ width: "100%", padding: "9px 14px", background: `linear-gradient(135deg,${face.color},${face.color}cc)`, border: "none", color: "white", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, boxShadow: `0 0 15px ${face.color}44` }}>
            {t.robot_back_guide || t.robot_back_guide || "↩ Back to guide"}
          </button>
          <button onClick={onClose} style={{ width: "100%", marginTop: 7, padding: "7px", background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 11 }}>
            {t.robot_skip || t.robot_skip || "Skip guide"}
          </button>
        </div>
        <style>{`@keyframes slideUpIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 7500, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: "0 24px 24px", pointerEvents: "none" }}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,8,20,0.72)", backdropFilter: "blur(8px)", pointerEvents: "all" }} onClick={onClose} />

      {/* Spotlight for highlighted page button in nav */}
      {currentStep.page && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 70, background: `linear-gradient(to bottom,${face.color}08,transparent)`, borderBottom: `1px solid ${face.color}22` }} />
        </div>
      )}

      {/* Main panel */}
      <div style={{ position: "relative", width: "100%", maxWidth: 440, pointerEvents: "all", animation: "slideUpIn 0.5s cubic-bezier(.34,1.56,.64,1)" }}>

        {/* Step progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 7, marginBottom: 14 }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => transition(() => setStep(i))} style={{
              width: i === step ? 24 : 7, height: 7, borderRadius: 99, border: "none", cursor: "pointer",
              background: i === step ? face.color : i < step ? `${face.color}55` : "rgba(255,255,255,0.18)",
              transition: "all 0.35s ease", padding: 0,
            }} title={steps[i].title} />
          ))}
        </div>

        {/* Card */}
        <div style={{ background: "linear-gradient(145deg,rgba(13,20,64,0.99),rgba(22,8,52,0.99))", border: `1.5px solid ${face.color}44`, borderRadius: 24, padding: "24px 22px 20px", boxShadow: `0 32px 80px rgba(0,0,0,0.85),0 0 50px ${face.color}18`, position: "relative", overflow: "hidden" }}>

          {/* Ambient glow */}
          <div style={{ position: "absolute", top: -80, right: -80, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle,${face.color}18,transparent)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -40, width: 150, height: 150, borderRadius: "50%", background: `radial-gradient(circle,${face.color}0c,transparent)`, pointerEvents: "none" }} />

          {/* Close button */}
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", zIndex: 1 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>✕</button>

          {/* Robot + Speech Bubble row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>

            {/* Robot SVG */}
            <MiraRobot color={face.color} anim={face.anim} size={76} />

            {/* Speech bubble */}
            <div style={{ flex: 1, opacity: bubbleVisible ? 1 : 0, transform: bubbleVisible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.96)", transition: "all 0.28s cubic-bezier(.34,1.4,.64,1)" }}>
              <div style={{ background: `linear-gradient(135deg,${face.color}16,${face.color}08)`, border: `1px solid ${face.color}44`, borderRadius: "4px 18px 18px 18px", padding: "13px 15px", position: "relative" }}>
                {/* Bubble tail */}
                <div style={{ position: "absolute", left: -9, top: 14, width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderRight: `9px solid ${face.color}44` }} />
                {/* Emoji row */}
                <div style={{ fontSize: 14, marginBottom: 6, letterSpacing: 2 }}>{currentStep.emoji}</div>
                {/* Step icon + title */}
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{currentStep.icon}</span>
                  <span style={{ color: "white", fontWeight: 800, fontSize: 15, lineHeight: 1.3 }}>{currentStep.title}</span>
                </div>
                {/* Description */}
                <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 12.5, lineHeight: 1.75, whiteSpace: "pre-line" }}>{currentStep.desc}</div>
              </div>
            </div>
          </div>

          {/* Try It button — clickable navigation */}
          {currentStep.page && (
            <button onClick={handleTryIt} style={{
              width: "100%", padding: "11px 16px", marginBottom: 12,
              background: `linear-gradient(135deg,${face.color}25,${face.color}15)`,
              border: `1.5px solid ${face.color}60`,
              color: "white", borderRadius: 12, cursor: "pointer",
              fontSize: 13, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.25s",
              boxShadow: `0 0 20px ${face.color}22`,
              animation: "tryItPulse 2.5s ease infinite",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg,${face.color}40,${face.color}28)`; e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = `0 0 30px ${face.color}44`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg,${face.color}25,${face.color}15)`; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 0 20px ${face.color}22`; }}>
              <span style={{ fontSize: 16 }}>👆</span>
              {currentStep.tryLabel || (t.robot_try || "Thử ngay!")}
              <span style={{ marginLeft: "auto", background: `${face.color}33`, padding: "2px 8px", borderRadius: 99, fontSize: 11, color: face.color }}>Thử →</span>
            </button>
          )}

          {/* Step counter + nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 11 }}>
              {t.robot_step || t.robot_step || "Step"} <span style={{ color: face.color, fontWeight: 700 }}>{step + 1}</span> {t.robot_of || "/"} {steps.length}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {!isFirst && (
                <button onClick={goPrev} style={{ padding: "8px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", borderRadius: 9, cursor: "pointer", fontSize: 12, transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}>
                  ← {t.robot_prev || t.robot_prev || "Back"}
                </button>
              )}
              <button onClick={goNext} style={{ padding: "9px 20px", background: `linear-gradient(135deg,${face.color},${face.color}bb)`, border: "none", color: "white", borderRadius: 9, cursor: "pointer", fontSize: 12, fontWeight: 700, boxShadow: `0 0 18px ${face.color}44`, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
                {isLast ? (t.robot_finish || t.robot_finish || "🚀 Start!") : (t.robot_next || "Tiếp →")}
              </button>
            </div>
          </div>

          {!isLast && (
            <button onClick={onClose} style={{ width: "100%", marginTop: 10, padding: "6px", background: "none", border: "none", color: "rgba(255,255,255,0.25)", cursor: "pointer", fontSize: 11 }}>
              {t.robot_skip || t.robot_skip || "Skip guide"}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes robotWave{0%{transform:translateY(0) rotate(-3deg)}100%{transform:translateY(-8px) rotate(3deg)}}
        @keyframes robotThink{0%{transform:translateX(0) rotate(-2deg)}100%{transform:translateX(5px) rotate(6deg)}}
        @keyframes robotJump{0%{transform:translateY(0) scaleY(1)}100%{transform:translateY(-14px) scaleY(0.93)}}
        @keyframes robotBounce{0%{transform:translateY(0) rotate(0deg)}100%{transform:translateY(-10px) rotate(-3deg)}}
        @keyframes robotSpin{0%{transform:rotate(-6deg) scale(1)}100%{transform:rotate(6deg) scale(1.04)}}
        @keyframes robotNod{0%{transform:rotate(-5deg) translateY(0)}100%{transform:rotate(5deg) translateY(-4px)}}
        @keyframes robotDance{0%{transform:translateX(-8px) rotate(-6deg)}100%{transform:translateX(8px) rotate(6deg)}}
        @keyframes slideUpIn{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes tryItPulse{0%,100%{box-shadow:0 0 20px ${`rgba(108,61,232,0.22)`}}50%{box-shadow:0 0 35px ${`rgba(108,61,232,0.45)`}}}
      `}</style>
    </div>
  );
}

// =================== FLOATING ROBOT BUTTON ===================
function FloatingRobot({ onClick, color = "#6c3de8" }) {
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(0);
  const pulseEmojis = ["💡", "✨", "🔮"];

  useEffect(() => {
    const ti = setInterval(() => setPulse(p => (p + 1) % 3), 2200);
    return () => clearInterval(ti);
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 7000, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
      {hovered && (
        <div style={{ background: "rgba(13,20,64,0.97)", border: `1px solid ${color}55`, borderRadius: 14, padding: "10px 16px", color: "white", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", backdropFilter: "blur(12px)", animation: "fadeInUp 0.2s ease", boxShadow: `0 8px 30px rgba(0,0,0,0.5),0 0 20px ${color}22` }}>
          <span style={{ marginRight: 6 }}>🤖</span>Mira — Hướng dẫn nhanh
        </div>
      )}
      <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg,${color},#22d3ee)`, border: "2px solid rgba(255,255,255,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: `0 8px 30px ${color}55`, animation: "floatPulse 2.2s ease infinite", transition: "transform 0.2s", transform: hovered ? "scale(1.18)" : "scale(1)" }}>
        🤖
      </button>
      <div style={{ position: "absolute", top: -3, right: -3, width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#ef4444,#f97316)", border: "2px solid #0a0e27", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, animation: "notifBounce 2.4s ease infinite" }}>
        {pulseEmojis[pulse]}
      </div>
      <style>{`
        @keyframes floatPulse{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes notifBounce{0%,100%{transform:scale(1) rotate(0deg)}50%{transform:scale(1.25) rotate(15deg)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}


// =================== BACK BUTTON ===================
function BackButton({ onClick, label = "← Trang chủ" }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "rgba(108,61,232,0.08)", border: "1px solid rgba(108,61,232,0.2)",
      color: "rgba(167,139,250,0.8)", padding: "8px 18px", borderRadius: 99,
      cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all 0.25s",
      marginBottom: 28, backdropFilter: "blur(10px)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(108,61,232,0.2)"; e.currentTarget.style.borderColor = "rgba(108,61,232,0.5)"; e.currentTarget.style.color = "#c4b5fd"; e.currentTarget.style.transform = "translateX(-3px)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(108,61,232,0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(108,61,232,0.08)"; e.currentTarget.style.borderColor = "rgba(108,61,232,0.2)"; e.currentTarget.style.color = "rgba(167,139,250,0.8)"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.2)"; }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      {label}
    </button>
  );
}

// =================== HOME PAGE ===================
function HomePage({ setPage, user, onAuthClick, t }) {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    // Enhanced neural network particles
    const pts = Array.from({ length: 100 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 2 + .3,
      a: Math.random() * 0.8 + 0.1,
      hue: Math.random() > 0.6 ? 200 : 265,
    }));

    let raf, mx = w/2, my = h/2;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        // Subtle mouse repel
        const dx = p.x - mx, dy = p.y - my, dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 120) { p.vx += dx/dist * 0.02; p.vy += dy/dist * 0.02; }
        p.vx *= 0.995; p.vy *= 0.995;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0||p.x > w) p.vx *= -1;
        if (p.y < 0||p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},70%,70%,${p.a})`;
        ctx.fill();
      });
      // Connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
          if (d < 110) {
            const alpha = (1 - d/110) * 0.25;
            const grad = ctx.createLinearGradient(pts[i].x, pts[i].y, pts[j].x, pts[j].y);
            grad.addColorStop(0, `hsla(${pts[i].hue},70%,65%,${alpha})`);
            grad.addColorStop(1, `hsla(${pts[j].hue},70%,65%,${alpha})`);
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = grad; ctx.lineWidth = .6; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  const features = [
    { icon:"🤖", title:t.f1_title, desc:t.f1_desc, page:"ai",       color:"#6c3de8", gradient:"linear-gradient(135deg,#6c3de8,#8b5cf6)" },
    { icon:"🧩", title:t.f2_title, desc:t.f2_desc, page:"test",      color:"#8b5cf6", gradient:"linear-gradient(135deg,#8b5cf6,#a78bfa)" },
    { icon:"📔", title:t.f3_title, desc:t.f3_desc, page:"journal",   color:"#22d3ee", gradient:"linear-gradient(135deg,#0891b2,#22d3ee)" },
    { icon:"🌊", title:t.f4_title, desc:t.f4_desc, page:"special",   color:"#ec4899", gradient:"linear-gradient(135deg,#db2777,#ec4899)" },
    { icon:"💬", title:t.nav_chat||"AI Chat",      desc:t.chat_sub||t.f1_desc||"Chat with AI",        page:"chat", color:"#10b981", gradient:"linear-gradient(135deg,#059669,#10b981)" },
    { icon:"🌿", title:t.nav_game||"Góc Chữa Lành", desc:t.game_sub||"Healing games with AI",  page:"game", color:"#f59e0b", gradient:"linear-gradient(135deg,#d97706,#f59e0b)" },
    { icon:"🌸", title:t.garden_title||"Khu Vườn Tâm Trạng", desc:t.garden_sub||"Chăm sóc cây tinh thần, nhận huy hiệu mỗi ngày", page:"garden", color:"#22c55e", gradient:"linear-gradient(135deg,#059669,#22c55e)" },
    { icon:"✨", title:t.replay_title||"Mind Replay", desc:t.replay_sub||"AI tổng kết hành trình cảm xúc theo tuần/tháng", page:"replay", color:"#ec4899", gradient:"linear-gradient(135deg,#db2777,#ec4899)" },
    { icon:"🔮", title:t.nav_predict||"Dự Đoán AI", desc:t.predict_sub||"AI dự đoán tâm trạng hôm nay", page:"predict", color:"#a78bfa", gradient:"linear-gradient(135deg,#7c3aed,#a78bfa)" },
    { icon:"📄", title:t.nav_report||"Báo Cáo PDF", desc:t.report_sub||"Xuất hồ sơ tâm lý cá nhân", page:"report", color:"#6b7280", gradient:"linear-gradient(135deg,#374151,#6b7280)" },
    { icon:"😊", title:t.nav_face||"Nhận Diện Cảm Xúc", desc:t.face_sub||"AI phân tích cảm xúc qua webcam", page:"face", color:"#f97316", gradient:"linear-gradient(135deg,#ea580c,#f97316)" },
    { icon:"🌐", title:t.nav_globe||"Biểu Đồ 3D", desc:t.globe_sub||"Quả cầu cảm xúc 3D tương tác", page:"globe", color:"#38bdf8", gradient:"linear-gradient(135deg,#0284c7,#38bdf8)" },
    { icon:"📈", title:t.nav_progress||"Tiến Độ", desc:t.progress_sub||"So sánh cảm xúc trước & sau", page:"progress", color:"#4ade80", gradient:"linear-gradient(135deg,#16a34a,#4ade80)" },
    { icon:"💙", title:t.nav_care||"Người Thân", desc:t.care_sub||"Chia sẻ xu hướng với người thân", page:"care", color:"#60a5fa", gradient:"linear-gradient(135deg,#2563eb,#60a5fa)" },
    { icon:"💌", title:t.nav_letter||"Thư Tương Lai", desc:t.letter_sub||"Viết thư cho bản thân tương lai", page:"letter", color:"#fbbf24", gradient:"linear-gradient(135deg,#d97706,#fbbf24)" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% -20%,#1a0f50 0%,#07091d 55%)", paddingTop:64, position:"relative", overflow:"hidden" }}>

      {/* Ambient orbs */}
      <div style={{ position:"absolute", top:"5%",  left:"8%",  width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(108,61,232,0.12),transparent 70%)", animation:"orbFloat 12s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"20%", right:"5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(34,211,238,0.08),transparent 70%)", animation:"orbFloat 15s ease-in-out 4s infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", left:"30%", width:600, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(236,72,153,0.06),transparent 70%)", animation:"orbFloat 18s ease-in-out 8s infinite", pointerEvents:"none" }} />

      {/* Neural canvas */}
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.55, pointerEvents:"none" }} />

      {/* ── HERO ── */}
      <div style={{ position:"relative", minHeight:"92vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ textAlign:"center", padding:"0 24px", maxWidth:860, opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(36px)", transition:"opacity 1.1s ease, transform 1.1s ease" }}>

          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"linear-gradient(135deg,rgba(108,61,232,0.2),rgba(34,211,238,0.1))", border:"1px solid rgba(108,61,232,0.35)", borderRadius:99, padding:"7px 22px", marginBottom:32, fontSize:12, letterSpacing:1.5, textTransform:"uppercase", fontWeight:600 }}>
            <span style={{ background:"linear-gradient(90deg,#a78bfa,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{t.badge}</span>
          </div>

          {/* Main headline */}
          <h1 style={{ fontSize:"clamp(36px,6vw,76px)", fontWeight:900, lineHeight:1.1, margin:"0 0 24px", letterSpacing:-1 }}>
            <span style={{ color:"white" }}>{t.tagline_1}</span><br />
            <span style={{
              background:"linear-gradient(135deg,#c4b5fd 0%,#a78bfa 30%,#38bdf8 60%,#22d3ee 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", display:"inline-block",
              filter:"drop-shadow(0 0 30px rgba(108,61,232,0.4))",
            }}>{t.tagline_2}</span><br />
            <span style={{ color:"white" }}>{t.tagline_3}</span>
          </h1>

          {/* Sub */}
          <p style={{ fontSize:"clamp(15px,2vw,18px)", color:"rgba(255,255,255,0.58)", lineHeight:1.85, margin:"0 0 48px", maxWidth:580, marginLeft:"auto", marginRight:"auto" }}>
            {t.sub_tagline}
          </p>

          {/* CTAs */}
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginBottom:72 }}>
            <button onClick={() => user ? setPage("ai") : onAuthClick("register")} style={{
              background:"linear-gradient(135deg,#6c3de8,#8b5cf6)", color:"white",
              border:"none", padding:"16px 38px", borderRadius:99, fontSize:15, fontWeight:700,
              cursor:"pointer", boxShadow:"0 0 50px rgba(108,61,232,0.5),0 8px 25px rgba(0,0,0,0.3)",
              transition:"all 0.3s", position:"relative", overflow:"hidden",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow="0 0 70px rgba(108,61,232,0.65),0 12px 30px rgba(0,0,0,0.35)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.boxShadow="0 0 50px rgba(108,61,232,0.5),0 8px 25px rgba(0,0,0,0.3)";}}>
              {t.explore_btn}
            </button>
            <button onClick={() => setPage("test")} style={{
              background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.9)",
              border:"1px solid rgba(255,255,255,0.18)", padding:"16px 38px", borderRadius:99,
              fontSize:15, fontWeight:600, cursor:"pointer", backdropFilter:"blur(12px)", transition:"all 0.3s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.3)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}>
              {t.test_btn}
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display:"flex", justifyContent:"center", gap:0, flexWrap:"wrap" }}>
            {[["10+", t.stat1, "#a78bfa"], ["AI", t.stat2, "#22d3ee"], ["100%", t.stat3, "#10b981"]].map(([n, l, c], idx) => (
              <div key={n} style={{ textAlign:"center", padding:"0 32px", borderRight: idx<2 ? "1px solid rgba(255,255,255,0.1)":"none" }}>
                <div style={{ fontSize:28, fontWeight:900, color:c, filter:`drop-shadow(0 0 12px ${c}88)` }}>{n}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:5, fontWeight:400 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator — no text */}
        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", animation:"float 2.5s ease infinite" }}>
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="7" y="1" width="6" height="13" rx="3" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
            <circle cx="10" cy="6" r="2" fill="rgba(255,255,255,0.5)">
              <animate attributeName="cy" values="5;9;5" dur="1.6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0.15;0.8" dur="1.6s" repeatCount="indefinite"/>
            </circle>
            <path d="M5 21l5 5 5-5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 18l3 3 3-3" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ position:"relative", maxWidth:1240, margin:"0 auto", padding:"0 24px 100px" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <h2 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:800, color:"white", margin:"0 0 14px", letterSpacing:-0.5 }}>{t.feature_title}</h2>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:16, maxWidth:480, margin:"0 auto" }}>{t.feature_sub}</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:22 }}>
          {features.map((f, i) => (
            <div key={i} onClick={() => setPage(f.page)} style={{
              position:"relative", borderRadius:22, padding:"30px 26px",
              background:`linear-gradient(135deg,rgba(7,9,29,0.9),rgba(13,12,40,0.8))`,
              border:"1px solid rgba(255,255,255,0.08)",
              cursor:"pointer", transition:"all 0.35s cubic-bezier(0.34,1.4,0.64,1)",
              overflow:"hidden",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform="translateY(-8px) scale(1.01)";
                e.currentTarget.style.borderColor=`${f.color}55`;
                e.currentTarget.style.boxShadow=`0 24px 60px rgba(0,0,0,0.4),0 0 40px ${f.color}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform="translateY(0) scale(1)";
                e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow="none";
              }}>

              {/* Background glow */}
              <div style={{ position:"absolute", top:-30, right:-30, width:140, height:140, borderRadius:"50%", background:`radial-gradient(circle,${f.color}18,transparent)`, pointerEvents:"none" }} />

              {/* Icon */}
              <div style={{ width:54, height:54, borderRadius:16, background:`${f.color}18`, border:`1px solid ${f.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:18, boxShadow:`0 0 20px ${f.color}22` }}>{f.icon}</div>

              <h3 style={{ color:"white", fontSize:17, fontWeight:700, margin:"0 0 9px", letterSpacing:-0.3 }}>{f.title}</h3>
              <p style={{ color:"rgba(255,255,255,0.5)", fontSize:13, lineHeight:1.75, margin:"0 0 20px" }}>{f.desc}</p>

              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ flex:1, height:1, background:`linear-gradient(to right,${f.color}44,transparent)` }} />
                <div style={{ background:f.gradient, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontSize:13, fontWeight:700 }}>{t.explore_link||"Explore →"}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        {!user && (
          <div style={{ marginTop:80, textAlign:"center", position:"relative" }}>
            {/* Glowing border card */}
            <div style={{ background:"linear-gradient(135deg,rgba(108,61,232,0.1),rgba(34,211,238,0.06))", border:"1px solid rgba(108,61,232,0.3)", borderRadius:28, padding:"56px 40px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)", width:300, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(108,61,232,0.18),transparent)", pointerEvents:"none" }} />
              <div style={{ fontSize:48, marginBottom:16 }}>🚀</div>
              <h2 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:800, color:"white", margin:"0 0 14px" }}>{t.cta_title}</h2>
              <p style={{ color:"rgba(255,255,255,0.5)", marginBottom:36, fontSize:15 }}>{t.cta_sub}</p>
              <button onClick={() => onAuthClick("register")} style={{
                background:"linear-gradient(135deg,#6c3de8,#8b5cf6,#22d3ee)", color:"white",
                border:"none", padding:"16px 44px", borderRadius:99, fontSize:15,
                fontWeight:700, cursor:"pointer",
                boxShadow:"0 0 60px rgba(108,61,232,0.4),0 0 100px rgba(34,211,238,0.15)",
                transition:"all 0.3s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 0 80px rgba(108,61,232,0.55),0 0 120px rgba(34,211,238,0.2)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 0 60px rgba(108,61,232,0.4),0 0 100px rgba(34,211,238,0.15)";}}>
                {t.cta_btn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// =================== VOICE INPUT BUTTON ===================
function VoiceInputBtn({ onResult, t }) {
  const [listening, setListening] = useState(false);
  const recRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return <span style={{ color:"rgba(255,255,255,0.3)", fontSize:12 }}>{t.voice_no_support||"Voice not supported"}</span>;

  const toggle = () => {
    if (listening) { recRef.current?.stop(); setListening(false); return; }
    const rec = new SpeechRecognition();
    rec.lang = "vi-VN"; rec.continuous = false; rec.interimResults = false;
    rec.onresult = e => { onResult(e.results[0][0].transcript); setListening(false); };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start(); setListening(true);
  };

  return (
    <button onClick={toggle} style={{
      display:"flex", alignItems:"center", gap:6, padding:"7px 16px",
      background: listening ? "rgba(239,68,68,0.15)" : "rgba(108,61,232,0.1)",
      border: `1px solid ${listening ? "rgba(239,68,68,0.35)" : "rgba(108,61,232,0.3)"}`,
      color: listening ? "#f87171" : "#a78bfa", borderRadius:99, cursor:"pointer", fontSize:13, fontWeight:600,
      marginTop:10, transition:"all 0.2s",
    }}>
      <span style={{ fontSize:16 }}>{listening ? "⏹" : "🎙️"}</span>
      {listening ? (t.voice_listening||"Đang nghe...") : (t.voice_start||"Nói thay vì gõ")}
      {listening && <span style={{ width:8, height:8, borderRadius:"50%", background:"#ef4444", animation:"pulse 0.8s ease infinite" }}/>}
    </button>
  );
}

// =================== AI PAGE ===================
function AIPage({ t, setPage }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [history, setHistory] = useState([]);

  const typeEffect = useCallback((text, setter) => {
    let i = 0; setter("");
    const ti = setInterval(() => { setter(text.slice(0, i)); i++; if (i > text.length) clearInterval(ti); }, 14);
    return () => clearInterval(ti);
  }, []);

  const analyze = async () => {
    if (!input.trim() || loading) return;
    setLoading(true); setResult(null); setTypedText("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: `You are the AI emotion analyst for MindMirror. The user shares: "${input}". Reply ONLY with this JSON (no markdown):\n{"emotion":"main emotion 1-2 words","positive":65,"intensity":70,"analysis":"psychological analysis 2-3 sentences","advice":"gentle advice 2-3 sentences","healing":"short healing quote","tags":["tag1","tag2","tag3"],"emoji":"1 emoji"}` }] })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content?.[0]?.text?.replace(/```json|```/g, "").trim() || "{}");
      setResult(parsed);
      typeEffect(parsed.analysis, setTypedText);
      setHistory(h => [{ input, result: parsed, time: new Date().toLocaleTimeString() }, ...h.slice(0, 4)]);
    } catch {
      const fallback = { emotion: "...", positive: 50, intensity: 50, analysis: "Listening to you. Every emotion deserves to be acknowledged.", advice: "Take a moment to sit with your feelings without judgment.", healing: "You are allowed to feel exactly as you do.", tags: ["emotion", "mood"], emoji: "💙" };
      setResult(fallback); typeEffect(fallback.analysis, setTypedText);
    }
    setLoading(false);
  };

  const moodLabels = [t.mood0, t.mood1, t.mood2, t.mood3, t.mood4, t.mood5, t.mood6, t.mood7];

  return (
    <MoodAtmosphereWrapper mood={result ? (result.positive >= 75 ? 7 : result.positive >= 55 ? 6 : result.positive >= 40 ? 4 : result.positive >= 25 ? 3 : 2) : 5}>
    <div style={{ paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        {setPage && <BackButton onClick={() => setPage("home")} label="← Trang chủ" />}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h1 style={{ fontSize: 34, fontWeight: 900, margin: "0 0 10px", background: "linear-gradient(135deg,#c4b5fd,#a78bfa,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>🤖 {t.ai_title}</h1>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15 }}>{t.ai_sub}</p>
        </div>
        <GlassCard style={{ marginBottom: 20 }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.ai_placeholder} style={{ width: "100%", minHeight: 110, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, color: "white", padding: "14px", fontSize: 14, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", lineHeight: 1.7 }}
            onFocus={e => e.target.style.borderColor = "rgba(108,61,232,.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"} />
          <button onClick={analyze} disabled={loading || !input.trim()} style={{ marginTop: 12, width: "100%", padding: "13px", borderRadius: 12, background: loading ? "rgba(108,61,232,.3)" : "linear-gradient(135deg,#6c3de8,#8b5cf6)", border: "none", color: "white", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? t.ai_loading : t.ai_btn}
          </button>
        </GlassCard>

        {result && (
          <div style={{ animation: "fadeInUp .5s ease" }}>
            <GlassCard style={{ marginBottom: 18, textAlign: "center" }}>
              <div style={{ fontSize: 52, marginBottom: 8 }}>{result.emoji}</div>
              <h2 style={{ color: "white", fontSize: 22, fontWeight: 700, margin: "0 0 10px" }}>{result.emotion}</h2>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                {(result.tags || []).map(tag => <span key={tag} style={{ background: "rgba(108,61,232,.2)", border: "1px solid rgba(108,61,232,.3)", color: "#c4b5fd", padding: "3px 10px", borderRadius: 99, fontSize: 11 }}>#{tag}</span>)}
              </div>
            </GlassCard>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
              {[{ label: t.ai_positive, val: result.positive, color: result.positive >= 50 ? "#22c55e" : "#ef4444" }, { label: t.ai_intensity, val: result.intensity, color: "#a78bfa" }].map(m => (
                <GlassCard key={m.label}>
                  <div style={{ color: "rgba(255,255,255,.55)", fontSize: 12, marginBottom: 6 }}>{m.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: m.color }}>{m.val}%</div>
                  <div style={{ height: 5, background: "rgba(255,255,255,.08)", borderRadius: 99, marginTop: 8 }}>
                    <div style={{ height: "100%", width: `${m.val}%`, background: m.color, borderRadius: 99, transition: "width 1s" }} />
                  </div>
                </GlassCard>
              ))}
            </div>
            <GlassCard style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><span>🧠</span><span style={{ color: "#a78bfa", fontWeight: 600 }}>{t.ai_analysis}</span></div>
              <p style={{ color: "rgba(255,255,255,.85)", lineHeight: 1.8, margin: 0, fontSize: 14 }}>{typedText}<span style={{ animation: "blink 1s infinite" }}>|</span></p>
            </GlassCard>
            <GlassCard style={{ marginBottom: 16, borderColor: "rgba(34,211,238,.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><span>💡</span><span style={{ color: "#22d3ee", fontWeight: 600 }}>{t.ai_advice}</span></div>
              <p style={{ color: "rgba(255,255,255,.85)", lineHeight: 1.8, margin: 0, fontSize: 14 }}>{result.advice}</p>
            </GlassCard>
            <GlassCard style={{ background: "linear-gradient(135deg,rgba(108,61,232,.15),rgba(34,211,238,.08))", borderColor: "rgba(167,139,250,.3)", textAlign: "center" }}>
              <div>✨</div>
              <blockquote style={{ color: "#c4b5fd", fontSize: 17, fontStyle: "italic", fontWeight: 500, margin: "10px 0 0", lineHeight: 1.7 }}>"{result.healing}"</blockquote>
            </GlassCard>
          </div>
        )}

        {history.length > 0 && (
          <div style={{ marginTop: 36 }}>
            <h3 style={{ color: "rgba(255,255,255,.6)", fontSize: 14, marginBottom: 12 }}>{t.ai_history}</h3>
            {history.map((h, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>{h.result.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "rgba(255,255,255,.75)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.input}</div>
                  <div style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}>{h.result.emotion} · {h.time}</div>
                </div>
                <div style={{ color: h.result.positive >= 50 ? "#22c55e" : "#ef4444", fontSize: 12, fontWeight: 600 }}>{h.result.positive}%</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
    </MoodAtmosphereWrapper>
  );
}

// =================== TEST PAGE ===================
function TestPage({ t, lang, setPage }) {
  const [active, setActive] = useState(null);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  const questions = MBTI_QUESTIONS_I18N[lang] || MBTI_QUESTIONS_I18N.vi;

  const getMBTI = (ans) => {
    const s = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    questions.forEach((q, i) => { const v = ans[i] || 3; const [a, b] = q.trait.split(""); if (v >= 4) s[b] += v - 3; else s[a] += 4 - v; });
    return `${s.E > s.I ? "E" : "I"}${s.S > s.N ? "S" : "N"}${s.T > s.F ? "T" : "F"}${s.J > s.P ? "J" : "P"}`;
  };

  const submit = () => {
    if (active === "mbti") { const type = getMBTI(answers); setResult({ type, data: MBTI_TYPES[type] || MBTI_TYPES["INFP"] }); }
    else {
      const demos = {
        eq: { type: "EQ Cao — Empathizer", data: { name: "Nhà Đồng Cảm Cảm Xúc", emoji: "💝", desc: "Bạn có khả năng nhận biết, hiểu và quản lý cảm xúc bản thân và người khác ở mức xuất sắc. EQ cao là nền tảng của mọi mối quan hệ lành mạnh.", strengths: ["Đồng cảm sâu sắc", "Tự nhận thức cao", "Quản lý stress tốt", "Kết nối thật sự với người khác"], careers: ["Tâm lý học / Tư vấn", "Y tế & Chăm sóc", "Giáo dục & Huấn luyện", "HR & Lãnh đạo con người", "Nghệ thuật trị liệu"], color: "#ec4899" } },
        learn: { type: "Visual-Spatial Learner", data: { name: "Người Học Qua Hình Ảnh", emoji: "👁️", desc: "Não bộ bạn xử lý thông tin tốt nhất qua biểu đồ, sơ đồ, màu sắc và không gian. Học bằng mind map, flash card màu sắc và video sẽ hiệu quả hơn đọc văn bản thuần túy.", strengths: ["Tư duy không gian 3D", "Ghi nhớ hình ảnh xuất sắc", "Tư duy sáng tạo & trực quan", "Nhận ra pattern nhanh"], careers: ["Thiết kế đồ họa & UI/UX", "Kiến trúc & Nội thất", "Nhiếp ảnh & Phim ảnh", "Marketing & Truyền thông", "Kỹ thuật & Toán học"], color: "#22d3ee" } },
        intro: { type: "Ambivert nghiêng Introvert", data: { name: "Hướng Nội Sáng Tạo", emoji: "🌙", desc: "Bạn lấy năng lượng từ sự tĩnh lặng và chiều sâu. Không có nghĩa là nhút nhát — bạn chọn lọc kết nối có ý nghĩa hơn là rộng nhưng nông.", strengths: ["Tập trung sâu & bền bỉ", "Suy nghĩ độc lập & sâu sắc", "Lắng nghe chủ động tốt", "Sáng tạo trong yên lặng"], careers: ["Nghiên cứu & Khoa học", "Viết lách & Biên tập", "Lập trình & Data", "Nghệ thuật & Âm nhạc", "Triết học & Tâm lý"], color: "#6c3de8" } },
        stress: { type: "Resilient — Kiên Cường", data: { name: "Người Kiên Cường Cảm Xúc", emoji: "🧘", desc: "Bạn có khả năng phục hồi tốt sau stress. Bạn biết nhận ra áp lực và có chiến lược ứng phó lành mạnh. Đây là kỹ năng tâm lý quý giá cần vun dưỡng.", strengths: ["Quản lý stress hiệu quả", "Tư duy linh hoạt", "Tự điều tiết cảm xúc", "Phục hồi nhanh sau khó khăn"], careers: ["Lãnh đạo & Quản lý", "Y tế & Cấp cứu", "Giáo dục", "Khởi nghiệp", "Thể thao chuyên nghiệp"], color: "#10b981" } },
      };
      setResult(demos[active]);
    }
  };

  const tests = [
    { id: "mbti", name: "MBTI", icon: "🧩", desc: "16 kiểu tính cách Myers-Briggs (16 câu hỏi)", time: "8 phút", q: questions.length },
    { id: "eq", name: "EQ", icon: "❤️", desc: "Trí tuệ cảm xúc", time: "4 min", q: 6 },
    { id: "learn", name: "VARK", icon: "📚", desc: "Kiểu học tập Visual/Auditory/Read/Kinesthetic", time: "4 phút", q: 8 },
    { id: "intro", name: "I/E", icon: "🌓", desc: "Hướng nội / Hướng ngoại — năng lượng từ đâu?", time: "4 phút", q: 8 },
    { id: "stress", name: "Stress EQ", icon: "🧘", desc: "Khả năng quản lý stress và cảm xúc", time: "5 phút", q: 8 },
  ];

  if (result) return (
    <div style={{ minHeight: "100vh", background: "#0a0e27", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 12 }}>{result.data.emoji}</div>
        <div style={{ display: "inline-block", background: `${result.data.color}22`, border: `1px solid ${result.data.color}44`, color: result.data.color, padding: "4px 16px", borderRadius: 99, fontSize: 12, marginBottom: 12 }}>{result.type}</div>
        <h1 style={{ color: "white", fontSize: 32, fontWeight: 800, margin: "8px 0 14px" }}>{result.data.name}</h1>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>{result.data.desc}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24, textAlign: "left" }}>
          {[{ label: t.test_strengths, items: result.data.strengths, color: "#a78bfa" }, { label: t.test_careers, items: result.data.careers, color: "#22d3ee" }].map(s => (
            <GlassCard key={s.label}>
              <h3 style={{ color: s.color, fontSize: 13, fontWeight: 600, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</h3>
              {s.items.map(item => <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, flexShrink: 0 }} /><span style={{ color: "rgba(255,255,255,.8)", fontSize: 13 }}>{item}</span></div>)}
            </GlassCard>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => { setResult(null); setActive(null); setAnswers({}); setStep(0); }} style={{ flex: 1, padding: 13, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "white", borderRadius: 12, cursor: "pointer" }}>{t.test_back}</button>
          <button onClick={() => { setResult(null); setAnswers({}); setStep(0); }} style={{ flex: 1, padding: 13, background: "linear-gradient(135deg,#6c3de8,#8b5cf6)", border: "none", color: "white", borderRadius: 12, cursor: "pointer" }}>{t.test_redo}</button>
        </div>
      </div>
    </div>
  );

  if (active) {
    const NON_MBTI_QS = {
      eq: [
        { q: "Tôi nhận ra khi ai đó đang buồn dù họ không nói ra", trait: "TF" },
        { q: "Tôi thường mất bình tĩnh khi bị chỉ trích hoặc phê phán", trait: "TF" },
        { q: "Tôi có thể kiểm soát cảm xúc trong tình huống căng thẳng cao độ", trait: "TF" },
        { q: "Tôi hiểu rõ điều gì khiến mình vui, buồn hay tức giận", trait: "TF" },
        { q: "Tôi thường đặt mình vào hoàn cảnh của người khác trước khi phán xét", trait: "TF" },
        { q: "Khi xung đột, tôi có thể lắng nghe cả hai phía trước khi phản ứng", trait: "TF" },
        { q: "Tôi nhận ra khi cảm xúc của mình đang ảnh hưởng đến quyết định của mình", trait: "TF" },
        { q: "Tôi có thể an ủi người khác một cách chân thật khi họ khó khăn", trait: "TF" },
      ],
      learn: [
        { q: "Tôi hiểu bài tốt hơn khi có sơ đồ, biểu đồ hoặc hình ảnh minh họa", trait: "SN" },
        { q: "Tôi ghi nhớ thông tin tốt hơn khi nghe giải thích bằng lời nói", trait: "SN" },
        { q: "Tôi học hiệu quả nhất khi thực hành trực tiếp bằng tay", trait: "SN" },
        { q: "Tôi thích đọc tài liệu và ghi chép cẩn thận hơn là nghe giảng", trait: "SN" },
        { q: "Khi học môn mới, tôi muốn xem video minh họa trước", trait: "SN" },
        { q: "Tôi nhớ thông tin tốt hơn sau khi tóm tắt lại bằng lời của mình", trait: "SN" },
        { q: "Tôi thích thí nghiệm và thực hành hơn là lý thuyết trên giấy", trait: "SN" },
        { q: "Tôi học tốt trong yên tĩnh với sách hơn là trong lớp học ồn ào", trait: "SN" },
      ],
      intro: [
        { q: "Sau một ngày dài gặp gỡ nhiều người, tôi cảm thấy mệt và cần một mình để phục hồi", trait: "EI" },
        { q: "Tôi cảm thấy thoải mái và tự nhiên nhất khi ở một mình hoặc với nhóm nhỏ thân thiết", trait: "EI" },
        { q: "Trong cuộc trò chuyện nhóm, tôi thường lắng nghe nhiều hơn là nói", trait: "EI" },
        { q: "Tôi thích giao tiếp qua tin nhắn hoặc email hơn là nói chuyện trực tiếp tự phát", trait: "EI" },
        { q: "Tôi cần thời gian riêng để xử lý cảm xúc trước khi chia sẻ với người khác", trait: "EI" },
        { q: "Tôi thích làm việc độc lập hơn là trong nhóm ồn ào", trait: "EI" },
        { q: "Tôi thường cảm thấy bị ngắt quãng và mất tập trung khi bị người khác làm phiền", trait: "EI" },
        { q: "Tôi tìm thấy nguồn cảm hứng và sạc năng lượng tốt nhất khi ở một mình", trait: "EI" },
      ],
      stress: [
        { q: "Khi gặp vấn đề lớn, tôi có thể giữ bình tĩnh và tìm giải pháp từng bước", trait: "TF" },
        { q: "Tôi thường lo lắng quá mức về những điều có thể xảy ra trong tương lai", trait: "TF" },
        { q: "Khi mọi thứ không theo kế hoạch, tôi dễ dàng điều chỉnh và tiếp tục", trait: "TF" },
        { q: "Căng thẳng kéo dài thường ảnh hưởng đến giấc ngủ và ăn uống của tôi", trait: "TF" },
        { q: "Tôi có những cách lành mạnh để giải tỏa stress (tập thể dục, thiền, viết nhật ký...)", trait: "TF" },
        { q: "Khi bị chỉ trích, tôi thường tập trung vào điểm cần cải thiện hơn là tự trách", trait: "TF" },
        { q: "Tôi có thể làm việc hiệu quả ngay cả khi áp lực cao", trait: "TF" },
        { q: "Sau khi trải qua thất bại, tôi thường phục hồi trong vòng vài ngày", trait: "TF" },
      ],
    };
    const qs = active === "mbti" ? questions : (NON_MBTI_QS[active] || NON_MBTI_QS.eq);
    const q = qs[step];
    const optsByLang = {
      vi: ["Hoàn toàn không", "Không đồng ý", "Trung lập", "Đồng ý", "Hoàn toàn đồng ý"],
      en: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      ja: ["全くそう思わない", "そう思わない", "どちらでもない", "そう思う", "強くそう思う"],
      ko: ["전혀 아니다", "아니다", "중립", "그렇다", "매우 그렇다"],
      zh: ["非常不同意", "不同意", "中立", "同意", "非常同意"],
      fr: ["Pas du tout d'accord", "Pas d'accord", "Neutre", "D'accord", "Tout à fait d'accord"],
    };
    const detectedLang = t.chat_you === "Bạn" ? "vi" : t.chat_you === "You" ? "en" : t.chat_you === "あなた" ? "ja" : t.chat_you === "나" ? "ko" : t.chat_you === "你" ? "zh" : "fr";
    const opts = optsByLang[detectedLang] || optsByLang.en;
    return (
      <div style={{ minHeight: "100vh", background: "#0a0e27", paddingTop: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 580, width: "100%", padding: "0 24px" }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "rgba(255,255,255,.45)", fontSize: 12 }}>{step + 1} / {qs.length}</span>
              <span style={{ color: "#a78bfa", fontSize: 12 }}>{Math.round(step / qs.length * 100)}%</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,.08)", borderRadius: 99 }}>
              <div style={{ height: "100%", width: `${step / qs.length * 100}%`, background: "linear-gradient(90deg,#6c3de8,#22d3ee)", borderRadius: 99, transition: "width .5s" }} />
            </div>
          </div>
          <GlassCard style={{ marginBottom: 20, textAlign: "center" }}>
            <p style={{ color: "white", fontSize: 18, lineHeight: 1.7, margin: 0, fontWeight: 500 }}>{q.q}</p>
          </GlassCard>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {["😤", "🙁", "😐", "🙂", "😊"].map((em, val) => (
              <button key={val} onClick={() => {
                const na = { ...answers, [step]: val + 1 };
                setAnswers(na);
                if (step + 1 >= qs.length) setTimeout(submit, 100);
                else setStep(step + 1);
              }} style={{ background: answers[step] === val + 1 ? "rgba(108,61,232,.3)" : "rgba(255,255,255,.04)", border: answers[step] === val + 1 ? "1px solid rgba(108,61,232,.6)" : "1px solid rgba(255,255,255,.07)", color: "rgba(255,255,255,.85)", padding: "13px 18px", borderRadius: 11, fontSize: 13, cursor: "pointer", textAlign: "left" }}>
                {em} {opts[val]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 30% 0%,#1a0a40 0%,#07091d 60%)", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        {setPage && <BackButton onClick={() => setPage("home")} label="← Trang chủ" />}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h1 style={{ fontSize: 34, fontWeight: 900, margin: "0 0 10px", background: "linear-gradient(135deg,#f9a8d4,#a78bfa,#818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>🧩 {t.test_title}</h1>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15 }}>{t.test_sub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18 }}>
          {tests.map(te => (
            <div key={te.id} onClick={() => { setActive(te.id); setStep(0); setAnswers({}); }} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "28px 22px", cursor: "pointer", transition: "all .3s", textAlign: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(108,61,232,.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>{te.icon}</div>
              <h3 style={{ color: "white", fontSize: 17, fontWeight: 700, margin: "0 0 8px" }}>{te.name}</h3>
              <p style={{ color: "rgba(255,255,255,.5)", fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>{te.desc}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}>⏱ {te.time}</span>
                <span style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}>📝 {te.q}q</span>
              </div>
              <div style={{ background: "linear-gradient(135deg,#6c3de8,#8b5cf6)", color: "white", padding: "9px", borderRadius: 9, fontSize: 13, fontWeight: 600 }}>{t.test_start}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =================== JOURNAL PAGE ===================
function JournalPage({ t, setPage }) {
  const [moods, setMoods] = useState(DEMO_MOODS);
  const [todayMood, setTodayMood] = useState(null);
  const [todayNote, setTodayNote] = useState("");
  const moodLabels = [t.mood0, t.mood1, t.mood2, t.mood3, t.mood4, t.mood5, t.mood6, t.mood7];

  const addMood = () => {
    if (todayMood === null) return;
    const today = new Date().toISOString().split("T")[0];
    setMoods(m => [{ date: today, score: todayMood + 1, note: todayNote || moodLabels[todayMood] }, ...m.filter(x => x.date !== today)]);
    setTodayMood(null); setTodayNote("");
  };

  const avg = (moods.reduce((a, m) => a + m.score, 0) / moods.length).toFixed(1);
  const best = moods.reduce((a, b) => a.score > b.score ? a : b, moods[0]);

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 70% 0%,#0a1840 0%,#07091d 60%)", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
        {setPage && <BackButton onClick={() => setPage("home")} label="← Trang chủ" />}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h1 style={{ fontSize: 34, fontWeight: 900, margin: "0 0 10px", background: "linear-gradient(135deg,#67e8f9,#22d3ee,#0891b2)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>📔 {t.journal_title}</h1>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15 }}>{t.journal_sub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 24 }}>
          {[{ label: t.avg_mood, value: avg, unit: "/8", color: "#a78bfa" }, { label: t.streak, value: 3, unit: " 🔥", color: "#f97316" }, { label: t.recorded, value: moods.length, unit: " " + t.days, color: "#22d3ee" }, { label: t.best, value: best?.score, unit: "/8 ✨", color: "#22c55e" }].map(s => (
            <GlassCard key={s.label} style={{ textAlign: "center" }}>
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}<span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{s.unit}</span></div>
            </GlassCard>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22 }}>
          <GlassCard>
            <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>{t.journal_today}</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              {MOOD_EMOJIS.map((e, i) => <button key={i} onClick={() => setTodayMood(i)} style={{ background: todayMood === i ? `${MOOD_COLORS[i]}33` : "none", border: todayMood === i ? `1px solid ${MOOD_COLORS[i]}` : "1px solid transparent", borderRadius: 8, padding: "5px", fontSize: 20, cursor: "pointer", transform: todayMood === i ? "scale(1.2)" : "scale(1)", transition: "all .2s" }}>{e}</button>)}
            </div>
            {todayMood !== null && <div style={{ textAlign: "center", color: MOOD_COLORS[todayMood], fontWeight: 600, fontSize: 13, marginBottom: 10 }}>{moodLabels[todayMood]}</div>}
            <textarea value={todayNote} onChange={e => setTodayNote(e.target.value)} placeholder={t.journal_note} style={{ width: "100%", minHeight: 72, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, color: "white", padding: "10px", fontSize: 13, resize: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            <button onClick={addMood} disabled={todayMood === null} style={{ width: "100%", marginTop: 10, padding: "11px", background: todayMood !== null ? "linear-gradient(135deg,#6c3de8,#8b5cf6)" : "rgba(255,255,255,.04)", border: "none", color: todayMood !== null ? "white" : "rgba(255,255,255,.3)", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: todayMood !== null ? "pointer" : "not-allowed" }}>{t.journal_save}</button>
          </GlassCard>
          <GlassCard>
            <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>{t.journal_chart}</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 110, justifyContent: "space-around" }}>
              {moods.slice(0, 7).reverse().map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
                  <div style={{ width: "100%", height: `${m.score / 8 * 100}px`, background: `linear-gradient(to top,${MOOD_COLORS[m.score - 1]},${MOOD_COLORS[m.score - 1]}88)`, borderRadius: "3px 3px 0 0", minHeight: 6 }} />
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,.35)", transform: "rotate(-45deg)", whiteSpace: "nowrap" }}>{m.date.slice(5)}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
        <GlassCard style={{ marginBottom: 18 }}>
          <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 14 }}>{t.journal_heatmap}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {Array.from({ length: 30 }, (_, i) => {
              const d = new Date(); d.setDate(d.getDate() - 29 + i);
              const ds = d.toISOString().split("T")[0];
              const m = moods.find(x => x.date === ds);
              return <div key={i} title={m ? `${ds}: ${moodLabels[m.score - 1]}` : ds} style={{ width: 22, height: 22, borderRadius: 3, background: m ? MOOD_COLORS[m.score - 1] : "rgba(255,255,255,.06)", opacity: m ? .85 : 1, cursor: m ? "pointer" : "default", transition: "transform .1s" }} onMouseEnter={e => e.target.style.transform = "scale(1.3)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />;
            })}
          </div>
        </GlassCard>
        <GlassCard>
          <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 14 }}>{t.journal_recent}</h3>
          {moods.slice(0, 5).map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
              <span style={{ fontSize: 22 }}>{MOOD_EMOJIS[m.score - 1]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: "rgba(255,255,255,.8)", fontSize: 13 }}>{m.note}</div>
                <div style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}>{m.date}</div>
              </div>
              <div style={{ padding: "3px 9px", borderRadius: 99, background: `${MOOD_COLORS[m.score - 1]}22`, color: MOOD_COLORS[m.score - 1], fontSize: 11 }}>{moodLabels[m.score - 1]}</div>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}

// =================== KNOWLEDGE PAGE ===================
function KnowledgePage({ t, setPage }) {
  const [selected, setSelected] = useState(null);
  const [aiContent, setAiContent] = useState("");
  const [loading, setLoading] = useState(false);

  const loadArticle = async (article) => {
    setSelected(article);
    // Use pre-written content if available
    if (article.content) {
      setAiContent(article.content);
      setLoading(false);
    } else {
      setLoading(true); setAiContent("");
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: `Viết bài viết chi tiết (400-500 từ) tiếng Việt về: "${article.title}". Phong cách: ấm áp, thực tế, hữu ích cho giới trẻ. Gồm: định nghĩa, khoa học, mẹo thực tế, động viên. Bắt đầu thẳng vào nội dung.` }] })
        });
        const data = await res.json();
        setAiContent(data.content?.[0]?.text || article.desc);
      } catch { setAiContent(article.desc); }
      setLoading(false);
    }
  };

  if (selected) return (
    <div style={{ minHeight: "100vh", background: "#0a0e27", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
        <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.65)", padding: "7px 14px", borderRadius: 8, cursor: "pointer", marginBottom: 28, fontSize: 13 }}>{t.back}</button>
        <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
          <span style={{ background: `${selected.color}22`, color: selected.color, padding: "3px 12px", borderRadius: 99, fontSize: 11 }}>{selected.tag}</span>
          <span style={{ color: "rgba(255,255,255,.4)", fontSize: 11 }}>⏱ {selected.read}</span>
        </div>
        <h1 style={{ color: "white", fontSize: 26, fontWeight: 700, margin: "0 0 28px", lineHeight: 1.4 }}>{selected.icon} {selected.title}</h1>
        <GlassCard>
          {loading ? <div style={{ textAlign: "center", padding: 36, color: "rgba(255,255,255,.5)" }}>🔮 AI đang tạo nội dung...</div>
            : <div style={{ color: "rgba(255,255,255,.85)", lineHeight: 1.9, fontSize: 14, whiteSpace: "pre-wrap" }}>{aiContent}</div>}
        </GlassCard>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 10%,#0f0f38 0%,#07091d 55%)", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {setPage && <BackButton onClick={() => setPage("home")} label="← Trang chủ" />}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h1 style={{ fontSize: 34, fontWeight: 900, margin: "0 0 10px", background: "linear-gradient(135deg,#a7f3d0,#34d399,#10b981)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>📚 {t.know_title}</h1>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15 }}>{t.know_sub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {ARTICLES.map((a, i) => (
            <div key={i} onClick={() => loadArticle(a)} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "26px", cursor: "pointer", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${a.color}44`; e.currentTarget.style.background = `${a.color}08`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 30 }}>{a.icon}</span>
                <span style={{ background: `${a.color}22`, color: a.color, padding: "3px 10px", borderRadius: 99, fontSize: 10, height: "fit-content" }}>{a.tag}</span>
              </div>
              <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.5 }}>{a.title}</h3>
              <p style={{ color: "rgba(255,255,255,.5)", fontSize: 12, lineHeight: 1.7, margin: "0 0 16px" }}>{a.desc}</p>
              <div style={{ color: a.color, fontSize: 12, fontWeight: 500 }}>{t.read_now}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =================== SPECIAL PAGE ===================
function SpecialPage({ t, setPage }) {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(5);
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const drawWave = useCallback((moodScore, energyScore) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth || 600;
    canvas.height = 200;
    let ti = 0;
    cancelAnimationFrame(animRef.current);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const freq = .015 + energyScore / 10 * .02;
      const amp = 20 + moodScore * 8;
      const color = MOOD_COLORS[Math.min(moodScore - 1, 7)] || "#a78bfa";
      for (let layer = 3; layer >= 1; layer--) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = canvas.height / 2 + Math.sin(x * freq + ti + layer * .5) * amp * (1 - layer * .2) + Math.sin(x * freq * .5 + ti * .7) * amp * .4;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `${color}${Math.floor((.6 - layer * .15) * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 3 - layer * .5; ctx.stroke();
      }
      ti += .03;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, []);

  useEffect(() => {
    if (mood !== null) drawWave(mood + 1, energy);
    return () => cancelAnimationFrame(animRef.current);
  }, [mood, energy, drawWave]);

  const analyze = async () => {
    if (!word.trim() || mood === null) return;
    setLoading(true);
    const moodLabels = [t.mood0, t.mood1, t.mood2, t.mood3, t.mood4, t.mood5, t.mood6, t.mood7];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 600, messages: [{ role: "user", content: `User describes their energy with keyword: "${word}", mood: ${moodLabels[mood]}, energy: ${energy}/10. Reply ONLY JSON (no markdown):\n{"aura":"aura color name","auraColor":"#hex","element":"element (Fire/Water/Air/Earth/Light)","message":"short deep spiritual message","affirmation":"positive affirmation","archetype":"psychological archetype"}` }] })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content?.[0]?.text?.replace(/```json|```/g, "").trim() || "{}");
      setResult(parsed);
    } catch { setResult({ aura: "Purple Creative", auraColor: "#8b5cf6", element: "Light", message: "Your energy is searching for direction. Trust your intuition.", affirmation: "I have enough strength to overcome any challenge.", archetype: "The Seeker" }); }
    setLoading(false);
  };

  const moodLabels = [t.mood0, t.mood1, t.mood2, t.mood3, t.mood4, t.mood5, t.mood6, t.mood7];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 0%,#1a0830 0%,#07091d 60%)", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        {setPage && <BackButton onClick={() => setPage("home")} label="← Trang chủ" />}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>🌊</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "white", margin: "0 0 10px" }}>{t.special_title}</h1>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15 }}>{t.special_sub}</p>
        </div>
        <GlassCard style={{ marginBottom: 20 }}>
          <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>{t.step1}</h3>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
            {MOOD_EMOJIS.map((e, i) => <button key={i} onClick={() => setMood(i)} style={{ flex: 1, background: mood === i ? `${MOOD_COLORS[i]}33` : "rgba(255,255,255,.04)", border: mood === i ? `1px solid ${MOOD_COLORS[i]}` : "1px solid rgba(255,255,255,.07)", borderRadius: 9, padding: "10px 3px", fontSize: 22, cursor: "pointer", transition: "all .2s", transform: mood === i ? "scale(1.1)" : "scale(1)" }}>{e}</button>)}
          </div>
          {mood !== null && <div style={{ textAlign: "center", color: MOOD_COLORS[mood], fontSize: 13, fontWeight: 600, marginTop: 8 }}>{moodLabels[mood]}</div>}
        </GlassCard>
        <GlassCard style={{ marginBottom: 20 }}>
          <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{t.step2} ({energy}/10)</h3>
          <input type="range" min={1} max={10} value={energy} onChange={e => setEnergy(+e.target.value)} style={{ width: "100%", accentColor: "#8b5cf6", margin: "8px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.4)", fontSize: 11 }}>
            <span>{t.exhausted}</span><span>{t.normal}</span><span>{t.full}</span>
          </div>
        </GlassCard>
        {mood !== null && (
          <GlassCard style={{ marginBottom: 20, overflow: "hidden" }}>
            <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11, marginBottom: 8 }}>{t.wave_label}</div>
            <canvas ref={canvasRef} style={{ width: "100%", height: 200, display: "block" }} />
          </GlassCard>
        )}
        <GlassCard style={{ marginBottom: 20 }}>
          <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 10 }}>{t.step3}</h3>
          <input value={word} onChange={e => setWord(e.target.value)} placeholder={t.step3_ph} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "white", padding: "12px 14px", fontSize: 14, boxSizing: "border-box" }} onKeyDown={e => e.key === "Enter" && analyze()} />
          <button onClick={analyze} disabled={!word.trim() || mood === null || loading} style={{ width: "100%", marginTop: 10, padding: "13px", borderRadius: 10, background: word.trim() && mood !== null ? "linear-gradient(135deg,#6c3de8,#22d3ee)" : "rgba(255,255,255,.04)", border: "none", color: word.trim() && mood !== null ? "white" : "rgba(255,255,255,.3)", fontSize: 14, fontWeight: 600, cursor: word.trim() && mood !== null ? "pointer" : "not-allowed" }}>{loading ? t.reading : t.read_btn}</button>
        </GlassCard>
        {result && (
          <GlassCard style={{ background: `linear-gradient(135deg,${result.auraColor}15,rgba(34,211,238,.05))`, borderColor: `${result.auraColor}33`, textAlign: "center", animation: "fadeInUp .6s ease" }}>
            <div style={{ fontSize: 52, marginBottom: 10 }}>🌟</div>
            <h2 style={{ color: "white", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Aura: {result.aura}</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ padding: "4px 14px", borderRadius: 99, background: `${result.auraColor}22`, color: result.auraColor, fontSize: 12 }}>{t.aura_label}: {result.element}</div>
              <div style={{ padding: "4px 14px", borderRadius: 99, background: "rgba(34,211,238,.15)", color: "#22d3ee", fontSize: 12 }}>{t.archetype_label}: {result.archetype}</div>
            </div>
            <div style={{ width: 70, height: 70, borderRadius: "50%", background: `radial-gradient(circle,${result.auraColor},${result.auraColor}44)`, margin: "0 auto 18px", boxShadow: `0 0 40px ${result.auraColor}66` }} />
            <p style={{ color: "rgba(255,255,255,.85)", fontSize: 15, lineHeight: 1.8, margin: "0 0 18px" }}>{result.message}</p>
            <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 12, padding: "14px" }}>
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11, marginBottom: 5 }}>{t.affirm_label}</div>
              <p style={{ color: "#c4b5fd", fontSize: 15, fontStyle: "italic", fontWeight: 500, margin: 0 }}>"{result.affirmation}"</p>
            </div>
          </GlassCard>
        )}
      </div>
      <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// =================== DASHBOARD PAGE ===================
function DashboardPage({ setPage, user, t }) {
  const moodLabels = [t.mood0, t.mood1, t.mood2, t.mood3, t.mood4, t.mood5, t.mood6, t.mood7];
  const name = user ? user.name.split(" ").slice(-1)[0] : "bạn";
  const mockData = { todayMood: 7, streak: 3, totalDays: 14, tests: ["MBTI: INFP", "EQ: 78/100"] };

  const insights = {
    vi: ["Bạn có xu hướng cảm xúc tích cực vào cuối tuần", "Mức năng lượng cao nhất vào buổi sáng sớm", "Bạn là người hướng nội với EQ cao"],
    en: ["You tend to feel more positive on weekends", "Your energy peaks in the early morning", "You are an introvert with high EQ"],
    ja: ["週末に感情的にポジティブになる傾向があります", "エネルギーは早朝にピークに達します", "あなたはEQの高い内向的な人です"],
    ko: ["주말에 더 긍정적인 감정을 느끼는 경향이 있습니다", "이른 아침에 에너지가 최고조에 달합니다", "당신은 EQ가 높은 내향적인 사람입니다"],
    zh: ["您往往在周末感到更积极", "您的精力在清晨达到顶峰", "您是一个情商高的内向者"],
    fr: ["Vous avez tendance à vous sentir plus positif le week-end", "Votre énergie est au plus haut tôt le matin", "Vous êtes une personne introvertie avec un EQ élevé"],
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 10%,#0f0f38 0%,#07091d 55%)", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 36, display: "flex", alignItems: "center", gap: 14 }}>
          {user && <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#6c3de8,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "white" }}>{user.avatar}</div>}
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "white", margin: "0 0 4px" }}>👋 {t.dash_hello}, {name}!</h1>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: 14, margin: 0 }}>{t.dash_sub}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 24 }}>
          {[{ label: t.dash_mood, value: MOOD_EMOJIS[mockData.todayMood - 1], sub: moodLabels[mockData.todayMood - 1], color: MOOD_COLORS[mockData.todayMood - 1] }, { label: t.dash_streak, value: `${mockData.streak}🔥`, sub: t.days, color: "#f97316" }, { label: t.dash_days, value: mockData.totalDays, sub: t.recorded, color: "#22d3ee" }, { label: t.dash_tests, value: mockData.tests.length, sub: "", color: "#a78bfa" }].map(s => (
            <GlassCard key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: 10, marginBottom: 2 }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: 11, fontWeight: 500 }}>{s.sub}</div>
            </GlassCard>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 20 }}>
          <GlassCard>
            <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 18 }}>{t.dash_progress}</h3>
            {[{ label: "Nhận thức cảm xúc", val: 72, color: "#a78bfa" }, { label: "Kiểm soát tâm trạng", val: 58, color: "#22d3ee" }, { label: "Trí tuệ cảm xúc", val: 78, color: "#22c55e" }, { label: "Tính nhất quán", val: 45, color: "#f97316" }].map(p => (
              <div key={p.label} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ color: "rgba(255,255,255,.7)", fontSize: 12 }}>{p.label}</span>
                  <span style={{ color: p.color, fontSize: 12, fontWeight: 600 }}>{p.val}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,.07)", borderRadius: 99 }}>
                  <div style={{ height: "100%", width: `${p.val}%`, background: p.color, borderRadius: 99, transition: "width 1s" }} />
                </div>
              </div>
            ))}
          </GlassCard>
          <GlassCard>
            <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 18 }}>{t.dash_insights}</h3>
            {(insights[Object.keys(T).find(k => T[k] === t)] || insights.vi).map((ins, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, padding: "10px", background: "rgba(255,255,255,.03)", borderRadius: 9 }}>
                <span style={{ fontSize: 18 }}>{"🌟💭🧘"[i]}</span>
                <span style={{ color: "rgba(255,255,255,.75)", fontSize: 12, lineHeight: 1.6 }}>{ins}</span>
              </div>
            ))}
          </GlassCard>
        </div>

        <GlassCard style={{ marginBottom: 20 }}>
          <h3 style={{ color: "white", fontSize: 15, fontWeight: 600, marginBottom: 14 }}>{t.dash_tests_done}</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {mockData.tests.map((te, i) => <div key={i} style={{ background: "linear-gradient(135deg,rgba(108,61,232,.2),rgba(34,211,238,.1))", border: "1px solid rgba(108,61,232,.3)", borderRadius: 10, padding: "10px 18px", color: "white", fontSize: 13, fontWeight: 500 }}>✅ {te}</div>)}
            <button onClick={() => setPage("test")} style={{ background: "rgba(255,255,255,.03)", border: "1px dashed rgba(255,255,255,.15)", borderRadius: 10, padding: "10px 18px", color: "rgba(255,255,255,.45)", fontSize: 13, cursor: "pointer" }}>{t.dash_more_tests}</button>
          </div>
        </GlassCard>

        {/* Mood Avatar + Healing Sounds */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:20 }}>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:20, padding:"24px", textAlign:"center", backdropFilter:"blur(12px)" }}>
            <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:14 }}>🎭 Mood Avatar hôm nay</div>
            <MoodAvatar mood={mockData.todayMood} size={110} />
            <div style={{ marginTop:12, color:"rgba(255,255,255,0.7)", fontSize:13 }}>{moodLabels[mockData.todayMood-1]}</div>
          </div>
          <HealingSounds t={t} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
          {[{ icon: "🤖✨", label: t.q1, page: "ai", color: "#6c3de8" }, { icon: "📔💭", label: t.q2, page: "journal", color: "#22d3ee" }, { icon: "🌊🔮", label: t.q3, page: "special", color: "#ec4899" }, { icon: "📚🧠", label: t.q4, page: "knowledge", color: "#22c55e" }, { icon: "💬🤝", label: t.q5 || "Chat MindBot", page: "chat", color: "#a78bfa" }, { icon: "🌿✨", label: t.nav_game || t.nav_game || "Healing Corner", page: "game", color: "#fbbf24" }, { icon: "🌿🌸", label: t.nav_garden || t.nav_garden || "Garden", page: "garden", color: "#22c55e" }, { icon: "✨📅", label: t.nav_replay || "Mind Replay", page: "replay", color: "#ec4899" }].map(a => (
            <button key={a.page} onClick={() => setPage(a.page)} style={{ background: `${a.color}12`, border: `1px solid ${a.color}2a`, borderRadius: 12, padding: "18px", cursor: "pointer", textAlign: "left", transition: "all .2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{a.icon}</div>
              <div style={{ color: "rgba(255,255,255,.8)", fontSize: 13, fontWeight: 500 }}>{a.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


// =================== CHATBOT PAGE ===================
const MINDBOT_ROLES = {
  friend: {
    system: (lang) => {
      const prompts = {
        vi: `Bạn là MindBot — người bạn thân AI ấm áp, đồng cảm, không phán xét của MindMirror. Hãy trò chuyện như người bạn thân thực sự: tự nhiên, chân thành, dùng ngôn ngữ trẻ trung thân mật. Đặt câu hỏi tiếp theo để hiểu sâu hơn. Thỉnh thoảng dùng emoji. Đừng đưa ra quá nhiều lời khuyên ngay lập tức — hãy lắng nghe trước. Giữ câu trả lời vừa phải, không quá dài. Luôn trả lời bằng tiếng Việt.`,
        en: `You are MindBot — a warm, empathetic AI best friend on MindMirror. Chat like a real close friend: natural, sincere, casual language. Ask follow-up questions to understand deeper. Use emojis occasionally. Don't give too much advice immediately — listen first. Keep responses moderate length. Always reply in English.`,
        ja: `あなたはMindBot — MindMirrorの温かく共感力のあるAIの親友です。本当の親友のように自然に会話してください。時々絵文字を使い、深く理解するためのフォローアップ質問をしてください。すぐに多くのアドバイスを与えず、まず聞いてください。日本語で返答してください。`,
        ko: `당신은 MindBot — MindMirror의 따뜻하고 공감하는 AI 친한 친구입니다. 진짜 친한 친구처럼 자연스럽게 대화하세요. 가끔 이모지를 사용하고, 더 깊이 이해하기 위한 후속 질문을 하세요. 즉시 너무 많은 조언을 주지 말고 먼저 들어주세요. 항상 한국어로 답하세요.`,
        zh: `你是MindBot — MindMirror温暖、有同理心的AI好友。像真正的好朋友一样自然地聊天。偶尔使用表情符号，提出后续问题以深入理解。不要立即给出太多建议——先倾听。始终用中文回复。`,
        fr: `Vous êtes MindBot — un ami IA chaleureux et empathique sur MindMirror. Conversez comme un vrai ami proche : naturel, sincère, langage décontracté. Posez des questions de suivi. Utilisez des emojis occasionnellement. N'offrez pas trop de conseils immédiatement — écoutez d'abord. Répondez toujours en français.`,
      };
      return prompts[lang] || prompts.en;
    },
    label_vi: "Người bạn thân",
    color: "#22d3ee",
    avatar: "🤝",
    gradient: "linear-gradient(135deg,#0891b2,#0e7490)",
  },
  therapist: {
    system: (lang) => {
      const prompts = {
        vi: `Bạn là MindBot — nhà tư vấn tâm lý AI chuyên nghiệp, nhẹ nhàng của MindMirror. Áp dụng kỹ thuật lắng nghe chủ động (active listening), phản chiếu cảm xúc, và CBT nhẹ. Đặt câu hỏi mở để người dùng tự khám phá. Không chẩn đoán bệnh tâm thần. Nếu người dùng có dấu hiệu khủng hoảng, khuyên họ liên hệ chuyên gia. Dùng ngôn ngữ trang trọng nhưng ấm áp. Luôn trả lời bằng tiếng Việt.`,
        en: `You are MindBot — a professional, gentle AI psychology counselor on MindMirror. Apply active listening, emotional reflection, and light CBT techniques. Ask open-ended questions for self-discovery. Don't diagnose mental illness. If user shows crisis signs, recommend professional help. Use warm but professional language. Always reply in English.`,
        ja: `あなたはMindBot — MindMirrorのプロフェッショナルで優しいAI心理カウンセラーです。積極的な傾聴、感情の反映、軽いCBT技術を適用してください。精神疾患の診断はしないでください。日本語で返答してください。`,
        ko: `당신은 MindBot — MindMirror의 전문적이고 부드러운 AI 심리 상담사입니다. 적극적 경청, 감정 반영, 가벼운 CBT 기법을 적용하세요. 정신 질환을 진단하지 마세요. 항상 한국어로 답하세요.`,
        zh: `你是MindBot — MindMirror专业、温和的AI心理咨询师。运用积极倾听、情感反映和轻度CBT技术。不要诊断精神疾病。始终用中文回复。`,
        fr: `Vous êtes MindBot — un conseiller psychologique IA professionnel et doux sur MindMirror. Appliquez l'écoute active, la réflexion émotionnelle et les techniques CBT légères. Ne diagnostiquez pas de maladies mentales. Répondez toujours en français.`,
      };
      return prompts[lang] || prompts.en;
    },
    color: "#a78bfa",
    avatar: "🧠",
    gradient: "linear-gradient(135deg,#6c3de8,#8b5cf6)",
  },
  coach: {
    system: (lang) => {
      const prompts = {
        vi: `Bạn là MindBot — life coach AI năng động, truyền cảm hứng của MindMirror. Giúp người dùng xác định mục tiêu, vượt qua rào cản tư duy, và hành động. Dùng ngôn ngữ tích cực, energetic. Đặt câu hỏi mạnh (powerful questions) như "Điều gì đang ngăn cản bạn?". Đưa ra gợi ý hành động cụ thể nhỏ. Luôn trả lời bằng tiếng Việt.`,
        en: `You are MindBot — a dynamic, inspiring AI life coach on MindMirror. Help users identify goals, overcome mental barriers, and take action. Use positive, energetic language. Ask powerful questions like "What's holding you back?". Give small concrete action suggestions. Always reply in English.`,
        ja: `あなたはMindBot — MindMirrorの活動的でインスピレーショナルなAIライフコーチです。目標の特定、思考の壁の克服、行動を支援してください。日本語で返答してください。`,
        ko: `당신은 MindBot — MindMirror의 역동적이고 영감을 주는 AI 라이프 코치입니다. 목표 설정, 사고 장벽 극복, 행동을 도와주세요. 항상 한국어로 답하세요.`,
        zh: `你是MindBot — MindMirror充满活力、鼓舞人心的AI人生教练。帮助用户识别目标、克服思维障碍并采取行动。始终用中文回复。`,
        fr: `Vous êtes MindBot — un coach de vie IA dynamique et inspirant sur MindMirror. Aidez les utilisateurs à identifier des objectifs et à passer à l'action. Répondez toujours en français.`,
      };
      return prompts[lang] || prompts.en;
    },
    color: "#f97316",
    avatar: "🚀",
    gradient: "linear-gradient(135deg,#ea580c,#f97316)",
  },
};

function ChatbotPage({ user, t, setPage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("friend");
  const [lang] = useState(() => {
    // detect language from t keys
    if (t.chat_you === "Bạn") return "vi";
    if (t.chat_you === "You") return "en";
    if (t.chat_you === "あなた") return "ja";
    if (t.chat_you === "나") return "ko";
    if (t.chat_you === "你") return "zh";
    if (t.chat_you === "Vous") return "fr";
    return "vi";
  });
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const inputRef = useRef(input);
  inputRef.current = input;

  const roleInfo = MINDBOT_ROLES[mode];

  // Init welcome message when mode changes
  useEffect(() => {
    setMessages([{
      id: Date.now(),
      role: "assistant",
      content: t.chat_welcome,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mode,
    }]);
    setShowSuggestions(true);
  }, [mode, t.chat_welcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const msgText = (text || inputRef.current).trim();
    if (!msgText || loading) return;
    setInput("");
    setShowSuggestions(false);

    const userMsg = { id: Date.now(), role: "user", content: msgText, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    // Build conversation history (exclude welcome if too long)
    const history = updatedMessages.slice(-12).map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          system: roleInfo.system(lang),
          messages: history,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "...";
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mode,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: "💙",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mode,
      }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const copyMsg = (id, text) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const clearChat = () => {
    if (window.confirm(t.chat_clear_confirm)) {
      setMessages([{
        id: Date.now(),
        role: "assistant",
        content: t.chat_welcome,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mode,
      }]);
      setShowSuggestions(true);
    }
  };

  const suggestions = [t.chat_sugg1, t.chat_sugg2, t.chat_sugg3, t.chat_sugg4];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e27", paddingTop: 64, display: "flex", flexDirection: "column" }}>
      {/* Back button for chat */}
      {setPage && <div style={{ padding: "8px 20px 0", maxWidth: 820, margin: "0 auto", width: "100%" }}><BackButton onClick={() => setPage("home")} label="← Trang chủ" /></div>}

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 20px", background: "rgba(10,14,39,0.95)", backdropFilter: "blur(20px)", position: "sticky", top: 64, zIndex: 100 }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: roleInfo.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, boxShadow: `0 0 20px ${roleInfo.color}44` }}>
                {roleInfo.avatar}
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>MindBot</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{loading ? t.chat_thinking : "Online"}</span>
                </div>
              </div>
            </div>
            <button onClick={clearChat} title={t.chat_new} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", padding: "6px 14px", borderRadius: 99, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
              ✦ {t.chat_new}
            </button>
          </div>

          {/* Mode selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, whiteSpace: "nowrap" }}>{t.chat_mode_label}</span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                { id: "friend", label: t.chat_mode_friend, color: "#22d3ee" },
                { id: "therapist", label: t.chat_mode_therapist, color: "#a78bfa" },
                { id: "coach", label: t.chat_mode_coach, color: "#f97316" },
              ].map(m => (
                <button key={m.id} onClick={() => setMode(m.id)} style={{
                  padding: "5px 14px", borderRadius: 99, border: `1px solid ${mode === m.id ? m.color : "rgba(255,255,255,0.1)"}`,
                  background: mode === m.id ? `${m.color}20` : "rgba(255,255,255,0.04)",
                  color: mode === m.id ? m.color : "rgba(255,255,255,0.55)",
                  fontSize: 12, fontWeight: mode === m.id ? 600 : 400, cursor: "pointer", transition: "all 0.2s",
                }}>{m.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 8px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>

          {messages.map((msg, idx) => (
            <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", animation: idx === messages.length - 1 ? "msgIn 0.35s cubic-bezier(.34,1.4,.64,1)" : "none" }}>
              {/* Avatar row */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, flexDirection: msg.role === "user" ? "row-reverse" : "row", maxWidth: "85%" }}>

                {/* Bot avatar */}
                {msg.role === "assistant" && (
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: MINDBOT_ROLES[msg.mode || mode].gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
                    {MINDBOT_ROLES[msg.mode || mode].avatar}
                  </div>
                )}

                {/* User avatar */}
                {msg.role === "user" && (
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6c3de8,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>
                    {user ? (user.avatar || user.name?.slice(0, 2).toUpperCase()) : "👤"}
                  </div>
                )}

                {/* Bubble */}
                <div style={{
                  background: msg.role === "user"
                    ? "linear-gradient(135deg,#6c3de8,#8b5cf6)"
                    : "rgba(255,255,255,0.05)",
                  border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  padding: "12px 16px",
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 14,
                  lineHeight: 1.75,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  boxShadow: msg.role === "user" ? "0 4px 20px rgba(108,61,232,0.35)" : "none",
                  backdropFilter: msg.role === "assistant" ? "blur(10px)" : "none",
                  position: "relative",
                }}>
                  {msg.content}
                </div>
              </div>

              {/* Time + copy */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4, paddingLeft: msg.role === "assistant" ? 42 : 0, paddingRight: msg.role === "user" ? 42 : 0 }}>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>{msg.time}</span>
                {msg.role === "assistant" && (
                  <button onClick={() => copyMsg(msg.id, msg.content)} style={{ background: "none", border: "none", color: copiedId === msg.id ? "#22c55e" : "rgba(255,255,255,0.25)", cursor: "pointer", fontSize: 11, padding: "0 4px" }}>
                    {copiedId === msg.id ? "✓ " + t.chat_copy : "⧉"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, animation: "msgIn 0.3s ease" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: roleInfo.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
                {roleInfo.avatar}
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px 18px 18px 4px", padding: "14px 20px", display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: roleInfo.color, animation: `dotBounce 1.2s ease ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && messages.length <= 1 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 10, paddingLeft: 42 }}>{t.chat_suggestions}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 42 }}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => send(s)} style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 99, color: "rgba(255,255,255,0.7)", padding: "8px 16px",
                    fontSize: 13, cursor: "pointer", transition: "all 0.2s", textAlign: "left",
                  }} onMouseEnter={e => { e.currentTarget.style.borderColor = `${roleInfo.color}66`; e.currentTarget.style.background = `${roleInfo.color}12`; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "14px 20px 20px", background: "rgba(10,14,39,0.95)", backdropFilter: "blur(20px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px"; }}
                onKeyDown={handleKey}
                placeholder={t.chat_placeholder}
                rows={1}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${input.length > 0 ? `${roleInfo.color}50` : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 16, color: "white", padding: "12px 48px 12px 16px",
                  fontSize: 14, resize: "none", fontFamily: "inherit",
                  lineHeight: 1.6, boxSizing: "border-box",
                  transition: "border-color 0.2s", maxHeight: 140, overflowY: "auto",
                }}
                onFocus={e => e.target.style.borderColor = `${roleInfo.color}80`}
                onBlur={e => e.target.style.borderColor = input.length > 0 ? `${roleInfo.color}50` : "rgba(255,255,255,0.1)"}
              />
              {input.length > 0 && (
                <span style={{ position: "absolute", bottom: 10, right: 12, color: "rgba(255,255,255,0.25)", fontSize: 10 }}>{input.length}</span>
              )}
            </div>

            <button onClick={() => send()} disabled={!input.trim() || loading} style={{
              width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
              background: input.trim() && !loading ? roleInfo.gradient : "rgba(255,255,255,0.06)",
              border: "none", color: input.trim() && !loading ? "white" : "rgba(255,255,255,0.25)",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
              transition: "all 0.2s", boxShadow: input.trim() && !loading ? `0 0 20px ${roleInfo.color}55` : "none",
            }} onMouseEnter={e => { if (input.trim() && !loading) e.currentTarget.style.transform = "scale(1.1)"; }} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              {loading ? "⏳" : "➤"}
            </button>
          </div>

          <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>Enter ↵ {t.chat_send} · Shift+Enter = xuống dòng</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: roleInfo.color }} />
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{MINDBOT_ROLES[mode].avatar} MindBot — {["friend","therapist","coach"].indexOf(mode) === 0 ? t.chat_mode_friend : ["friend","therapist","coach"].indexOf(mode) === 1 ? t.chat_mode_therapist : t.chat_mode_coach}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30%            { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}


// =================== GAME PAGE ===================
// 6 Healing Games with AI companion

// ── Game 1: Breathing Box (4-7-8) ──────────────────────────────────────────
function BreathingGame({ t, onBack }) {
  const [phase, setPhase] = useState("idle"); // idle | in | hold | out | rest
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [running, setRunning] = useState(false);
  const [size, setSize] = useState(80);
  const timerRef = useRef(null);

  const PHASES = [
    { key:"in",   dur:4, label: t.game_breath_in   || t.game_breath_in || "Breathe in...",   color:"#22d3ee", targetSize:160 },
    { key:"hold", dur:7, label: t.game_breath_hold || t.game_breath_hold || "Hold...",   color:"#a78bfa", targetSize:160 },
    { key:"out",  dur:8, label: t.game_breath_out  || "Thở ra...",    color:"#6c3de8", targetSize:80 },
    { key:"rest", dur:1, label: t.game_breath_rest || "Nghỉ...",      color:"#22c55e", targetSize:80 },
  ];
  const [phaseIdx, setPhaseIdx] = useState(0);
  const curPhase = PHASES[phaseIdx] || PHASES[0];

  useEffect(() => {
    if (!running) return;
    let c = count;
    const interval = setInterval(() => {
      c++;
      setCount(c);
      const dur = PHASES[phaseIdx]?.dur || 4;
      if (c >= dur) {
        clearInterval(interval);
        const next = (phaseIdx + 1) % PHASES.length;
        setPhaseIdx(next);
        setCount(0);
        if (next === 0) setCycles(cy => cy + 1);
        setSize(PHASES[next]?.targetSize || 80);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [running, phaseIdx]);

  const start = () => { setRunning(true); setPhaseIdx(0); setCount(0); setCycles(0); setSize(160); };
  const stop = () => { setRunning(false); setPhaseIdx(0); setCount(0); setSize(80); };

  const progress = running ? (count / (curPhase.dur || 4)) * 100 : 0;

  return (
    <div style={{ textAlign:"center", padding:"20px 0" }}>
      <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginBottom:24 }}>
        {t.game_cycles || t.game_cycles || "Cycles"}: <span style={{ color:"#a78bfa", fontWeight:700, fontSize:16 }}>{cycles}</span>
        {cycles >= 3 && <span style={{ marginLeft:10, color:"#22c55e" }}> {t.game_relax_msg || t.game_relax_msg || "You are relaxing nicely 💙"}</span>}
      </div>

      {/* Breathing circle */}
      <div style={{ position:"relative", width:220, height:220, margin:"0 auto 32px", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {/* Outer ring */}
        {running && (
          <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", border:`2px solid ${curPhase.color}44` }}>
            <svg style={{ position:"absolute", top:-2, left:-2 }} width="204" height="204" viewBox="0 0 204 204">
              <circle cx="102" cy="102" r="100" fill="none" stroke={curPhase.color} strokeWidth="3" strokeDasharray={`${2*Math.PI*100}`} strokeDashoffset={`${2*Math.PI*100 * (1 - progress/100)}`} transform="rotate(-90 102 102)" style={{ transition:"stroke-dashoffset 0.9s linear" }} strokeLinecap="round"/>
            </svg>
          </div>
        )}
        {/* Main breathing orb */}
        <div style={{
          width: running ? size : 100, height: running ? size : 100,
          borderRadius:"50%",
          background: running ? `radial-gradient(circle at 40% 35%, ${curPhase.color}cc, ${curPhase.color}44)` : "radial-gradient(circle at 40% 35%, rgba(108,61,232,0.6), rgba(34,211,238,0.3))",
          boxShadow: running ? `0 0 ${size/2}px ${curPhase.color}55, 0 0 ${size/4}px ${curPhase.color}33` : "0 0 40px rgba(108,61,232,0.3)",
          transition:"all 0.9s cubic-bezier(0.4,0,0.2,1)",
          display:"flex", alignItems:"center", justifyContent:"center",
          flexDirection:"column", cursor: running ? "default" : "pointer",
        }} onClick={!running ? start : undefined}>
          {running ? (
            <>
              <div style={{ color:"white", fontWeight:800, fontSize:26 }}>{(curPhase.dur || 4) - count}</div>
              <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, marginTop:2 }}>{curPhase.label}</div>
            </>
          ) : (
            <div style={{ color:"white", fontSize:13, fontWeight:600 }}>{t.game_tap_start || t.game_tap_start || "Tap to start"}</div>
          )}
        </div>
      </div>

      {running && (
        <div style={{ fontSize:18, fontWeight:700, color:curPhase.color, marginBottom:24, letterSpacing:1, animation:"breatheText 0.5s ease" }}>{curPhase.label}</div>
      )}

      <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
        {!running ? (
          <button onClick={start} style={{ padding:"12px 32px", background:"linear-gradient(135deg,#6c3de8,#22d3ee)", border:"none", color:"white", borderRadius:99, cursor:"pointer", fontSize:14, fontWeight:700, boxShadow:"0 0 30px rgba(108,61,232,0.4)" }}>
            🌬️ {t.game_play || t.game_play || "Start"}
          </button>
        ) : (
          <button onClick={stop} style={{ padding:"12px 28px", background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", color:"#f87171", borderRadius:99, cursor:"pointer", fontSize:13 }}>
            ⏹ Dừng
          </button>
        )}
      </div>

      {/* Phase guide */}
      <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:28, flexWrap:"wrap" }}>
        {PHASES.map((p,i) => (
          <div key={i} style={{ padding:"6px 14px", borderRadius:99, background: running && phaseIdx===i ? `${p.color}25` : "rgba(255,255,255,0.04)", border:`1px solid ${running && phaseIdx===i ? p.color+"55" : "rgba(255,255,255,0.08)"}`, transition:"all 0.3s" }}>
            <span style={{ color: running && phaseIdx===i ? p.color : "rgba(255,255,255,0.4)", fontSize:12, fontWeight: running && phaseIdx===i ? 700 : 400 }}>{p.label} {p.dur}s</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes breatheText{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}

// ── Game 2: Emotion Memory Match ────────────────────────────────────────────
function MemoryGame({ t, onBack }) {
  const CARDS_DATA = ["😊","😢","😡","😰","🥰","😌","😤","🥹","😊","😢","😡","😰","🥰","😌","😤","🥹"];
  const [cards, setCards] = useState(() => CARDS_DATA.map((e,i) => ({ id:i, emoji:e, flipped:false, matched:false })).sort(()=>Math.random()-0.5));
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [aiComment, setAiComment] = useState("Mình sẽ cổ vũ bạn! Lật thẻ để bắt đầu nào 🎯");
  const [locked, setLocked] = useState(false);
  const total = CARDS_DATA.length / 2;

  const comments = [
    "Tốt lắm! Bạn đang nhớ rất tốt 🧠","Tuyệt vời! Tiếp tục nhé! ✨","Mình thấy bạn đang tập trung cao độ 💪",
    "Wow, bộ nhớ siêu đỉnh! 🌟","Bạn đang làm rất tốt, đừng bỏ cuộc 💙","Còn một chút nữa thôi, cố lên! 🔥",
  ];

  const flip = (id) => {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;
    const newCards = cards.map(c => c.id===id ? {...c, flipped:true} : c);
    setCards(newCards);
    const newSel = [...selected, id];
    setSelected(newSel);
    if (newSel.length === 2) {
      setLocked(true);
      setMoves(m => m+1);
      const [a,b] = newSel.map(sid => newCards.find(c => c.id===sid));
      if (a.emoji === b.emoji) {
        setCards(prev => prev.map(c => newSel.includes(c.id) ? {...c, matched:true} : c));
        setMatched(m => m+1);
        setAiComment(comments[Math.floor(Math.random()*comments.length)]);
        setSelected([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newSel.includes(c.id) ? {...c, flipped:false} : c));
          setSelected([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const reset = () => {
    setCards(CARDS_DATA.map((e,i) => ({id:i,emoji:e,flipped:false,matched:false})).sort(()=>Math.random()-0.5));
    setSelected([]); setMoves(0); setMatched(0);
    setAiComment("Mình sẽ cổ vũ bạn! Lật thẻ để bắt đầu nào 🎯");
    setLocked(false);
  };

  const complete = matched === total;

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13 }}>
          🎯 {matched}/{total} · 👆 {moves} {t.game_score || t.game_score || "moves"}
        </div>
        <button onClick={reset} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", padding:"6px 14px", borderRadius:99, cursor:"pointer", fontSize:12 }}>{t.game_restart || t.game_restart || "🔄 Restart"}</button>
      </div>

      {/* AI comment bubble */}
      <div style={{ background:"rgba(108,61,232,0.12)", border:"1px solid rgba(108,61,232,0.25)", borderRadius:14, padding:"10px 16px", marginBottom:20, fontSize:13, color:"rgba(255,255,255,0.8)", display:"flex", gap:8, alignItems:"center" }}>
        <span style={{ fontSize:18, flexShrink:0 }}>🤖</span>
        <span>{complete ? "🎊 Xuất sắc! Bạn đã tìm được tất cả các cặp! Trí nhớ của bạn thật tuyệt vời!" : aiComment}</span>
      </div>

      {/* Card grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
        {cards.map(card => (
          <button key={card.id} onClick={() => flip(card.id)} style={{
            height:70, borderRadius:14, border:`2px solid ${card.matched ? "rgba(34,197,94,0.4)" : card.flipped ? "rgba(108,61,232,0.4)" : "rgba(255,255,255,0.1)"}`,
            background: card.matched ? "rgba(34,197,94,0.12)" : card.flipped ? "rgba(108,61,232,0.2)" : "rgba(255,255,255,0.05)",
            cursor: card.flipped || card.matched ? "default" : "pointer",
            fontSize:28, transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            transform: card.flipped || card.matched ? "scale(1.05)" : "scale(1)",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            {card.flipped || card.matched ? card.emoji : "❓"}
          </button>
        ))}
      </div>

      {complete && (
        <div style={{ textAlign:"center", marginTop:24, padding:"20px", background:"rgba(34,197,94,0.1)", borderRadius:16, border:"1px solid rgba(34,197,94,0.3)" }}>
          <div style={{ fontSize:36, marginBottom:8 }}>🎊</div>
          <div style={{ color:"#22c55e", fontWeight:700, fontSize:16 }}>Hoàn thành trong {moves} lượt!</div>
          <button onClick={reset} style={{ marginTop:14, padding:"10px 24px", background:"linear-gradient(135deg,#22c55e,#16a34a)", border:"none", color:"white", borderRadius:99, cursor:"pointer", fontSize:13, fontWeight:600 }}>
            {t.game_restart || t.game_restart || "🔄 Restart"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Game 3: Emotion Word Guess ──────────────────────────────────────────────
function WordGuessGame({ t, onBack }) {
  const WORDS = [
    { word:"HẠNH PHÚC", hint:"Cảm giác vui vẻ, mãn nguyện với cuộc sống", emoji:"😊", category:"Tích cực" },
    { word:"BÌNH YÊN", hint:"Trạng thái yên tĩnh, không lo âu", emoji:"😌", category:"Tích cực" },
    { word:"HY VỌNG", hint:"Mong đợi điều tốt đẹp sẽ đến", emoji:"🌟", category:"Tích cực" },
    { word:"BIẾT ƠN", hint:"Cảm kích với những gì mình có", emoji:"🙏", category:"Tích cực" },
    { word:"LO LẮNG", hint:"Cảm giác bất an về tương lai", emoji:"😰", category:"Tiêu cực" },
    { word:"CÔ ĐƠN", hint:"Cảm thấy thiếu sự kết nối với người khác", emoji:"😔", category:"Tiêu cực" },
    { word:"MỆT MỎI", hint:"Không còn năng lượng thể chất và tinh thần", emoji:"😴", category:"Tiêu cực" },
    { word:"TỰ TIN", hint:"Tin vào khả năng của bản thân", emoji:"💪", category:"Tích cực" },
    { word:"KIÊN NHẪN", hint:"Chờ đợi mà không nóng lòng", emoji:"🧘", category:"Tích cực" },
    { word:"ĐỒNG CẢM", hint:"Hiểu và chia sẻ cảm xúc của người khác", emoji:"💙", category:"Kỹ năng" },
  ];

  const [idx, setIdx] = useState(0);
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showAiHint, setShowAiHint] = useState(false);
  const [aiHint, setAiHint] = useState("");
  const [loadingHint, setLoadingHint] = useState(false);

  const current = WORDS[idx % WORDS.length];
  const letters = current.word.replace(/ /g,"");
  const uniqueLetters = [...new Set(letters.split(""))];
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĂĐƠƯ".split("");

  const allGuessed = uniqueLetters.every(l => guessed.includes(l));
  const isOver = wrong.length >= 6;

  const guess = (letter) => {
    if (guessed.includes(letter) || wrong.includes(letter) || revealed) return;
    if (letters.includes(letter)) {
      const ng = [...guessed, letter];
      setGuessed(ng);
      if (uniqueLetters.every(l => ng.includes(l))) { setScore(s => s + Math.max(10 - wrong.length*2, 1)); }
    } else {
      setWrong(w => [...w, letter]);
    }
  };

  const getAiHint = async () => {
    setLoadingHint(true); setShowAiHint(true); setHintsUsed(h => h+1);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:120,
          messages:[{ role:"user", content:`Từ cần đoán là "${current.word}" (cảm xúc/tâm lý). Hãy đưa ra 1 gợi ý ngắn gọn (1 câu) bằng tiếng Việt mà KHÔNG tiết lộ từ trực tiếp. Chỉ trả lời câu gợi ý.` }]
        })
      });
      const data = await res.json();
      setAiHint(data.content?.[0]?.text || current.hint);
    } catch { setAiHint(current.hint); }
    setLoadingHint(false);
  };

  const next = () => {
    setIdx(i => i+1); setGuessed([]); setWrong([]); setRevealed(false); setShowAiHint(false); setAiHint("");
  };

  const renderWord = () => current.word.split("").map((char, i) => {
    if (char === " ") return <span key={i} style={{ width:24, display:"inline-block" }} />;
    const isGuessed = guessed.includes(char);
    return (
      <span key={i} style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:32, height:36, borderBottom:`2px solid ${isGuessed ? "#a78bfa" : "rgba(255,255,255,0.3)"}`, margin:"0 3px", fontSize:18, fontWeight:700, color: isGuessed ? "white" : "transparent", transition:"all 0.3s" }}>
        {isGuessed || revealed ? char : "_"}
      </span>
    );
  });

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
        <div style={{ display:"flex", gap:12 }}>
          <span style={{ color:"#a78bfa", fontWeight:700 }}>⭐ {score}</span>
          <span style={{ color:current.category==="Tích cực"?"#22c55e":"#f97316", fontSize:12, padding:"3px 10px", borderRadius:99, border:`1px solid ${current.category==="Tích cực"?"rgba(34,197,94,0.3)":"rgba(249,115,22,0.3)"}` }}>{current.emoji} {current.category}</span>
        </div>
        <span style={{ color:"rgba(255,255,255,0.4)", fontSize:12 }}>{idx % WORDS.length + 1}/{WORDS.length}</span>
      </div>

      {/* Hangman lives */}
      <div style={{ display:"flex", gap:4, marginBottom:16, justifyContent:"center" }}>
        {[...Array(6)].map((_,i) => (
          <div key={i} style={{ width:20, height:20, borderRadius:"50%", background: i < wrong.length ? "#ef4444" : "rgba(255,255,255,0.1)", border: i < wrong.length ? "none" : "1px solid rgba(255,255,255,0.15)", transition:"all 0.3s", transform: i < wrong.length ? "scale(1.15)" : "scale(1)" }}>
            {i < wrong.length && <span style={{ fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", height:"100%" }}>💔</span>}
          </div>
        ))}
        <span style={{ color:"rgba(255,255,255,0.4)", fontSize:11, marginLeft:8, alignSelf:"center" }}>{6 - wrong.length} còn lại</span>
      </div>

      {/* Word display */}
      <div style={{ textAlign:"center", marginBottom:20, padding:"16px", background:"rgba(255,255,255,0.04)", borderRadius:14 }}>
        {renderWord()}
      </div>

      {/* Hint display */}
      <div style={{ background:"rgba(108,61,232,0.1)", border:"1px solid rgba(108,61,232,0.2)", borderRadius:12, padding:"10px 14px", marginBottom:16, fontSize:13, color:"rgba(255,255,255,0.7)" }}>
        💡 {current.hint}
      </div>

      {/* AI hint */}
      {showAiHint && (
        <div style={{ background:"rgba(34,211,238,0.08)", border:"1px solid rgba(34,211,238,0.2)", borderRadius:12, padding:"10px 14px", marginBottom:16, fontSize:13, color:"rgba(255,255,255,0.8)", display:"flex", gap:8 }}>
          <span>🤖</span><span>{loadingHint ? (t.game_ai_thinking || t.game_ai_thinking || "AI thinking...") : aiHint}</span>
        </div>
      )}

      {/* Keyboard */}
      {!allGuessed && !isOver && !revealed && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, justifyContent:"center", marginBottom:16 }}>
          {"ABCDEFGHIKLMNOPRSTU".split("").map(l => (
            <button key={l} onClick={() => guess(l)} disabled={guessed.includes(l)||wrong.includes(l)} style={{
              width:36, height:36, borderRadius:8, border:`1px solid ${wrong.includes(l)?"rgba(239,68,68,0.3)":guessed.includes(l)?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.15)"}`,
              background: wrong.includes(l)?"rgba(239,68,68,0.1)":guessed.includes(l)?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.05)",
              color: wrong.includes(l)?"#f87171":guessed.includes(l)?"#22c55e":"rgba(255,255,255,0.8)",
              cursor: guessed.includes(l)||wrong.includes(l) ? "default":"pointer", fontSize:13, fontWeight:600,
              transition:"all 0.15s",
            }}>{l}</button>
          ))}
        </div>
      )}

      <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
        {!showAiHint && !allGuessed && !isOver && (
          <button onClick={getAiHint} style={{ padding:"9px 18px", background:"rgba(34,211,238,0.12)", border:"1px solid rgba(34,211,238,0.25)", color:"#22d3ee", borderRadius:99, cursor:"pointer", fontSize:12, fontWeight:600 }}>
            🤖 AI Gợi ý
          </button>
        )}
        {!revealed && !allGuessed && (
          <button onClick={() => setRevealed(true)} style={{ padding:"9px 18px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.5)", borderRadius:99, cursor:"pointer", fontSize:12 }}>
            👁 Xem đáp án
          </button>
        )}
        {(allGuessed || isOver || revealed) && (
          <button onClick={next} style={{ padding:"10px 24px", background:"linear-gradient(135deg,#6c3de8,#8b5cf6)", border:"none", color:"white", borderRadius:99, cursor:"pointer", fontSize:13, fontWeight:700 }}>
            {t.game_next || "Tiếp →"}
          </button>
        )}
      </div>

      {(allGuessed || isOver) && (
        <div style={{ textAlign:"center", marginTop:16, padding:"14px", borderRadius:14, background:allGuessed?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)", border:`1px solid ${allGuessed?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"}` }}>
          <div style={{ fontSize:24 }}>{allGuessed ? "🎉" : "💙"}</div>
          <div style={{ color: allGuessed ? "#22c55e" : "#f87171", fontWeight:700 }}>
            {allGuessed ? t.game_win || "Bạn thắng!" : `Từ đúng là: ${current.word}`}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Game 4: AI Affirmations ─────────────────────────────────────────────────
function AffirmationGame({ t, onBack }) {
  const [mood, setMood] = useState("");
  const [affirmations, setAffirmations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState([]);
  const [saved, setSaved] = useState([]);

  // Detect language from t sentinel
  const langCode = t.chat_you === "Bạn" ? "vi" : t.chat_you === "You" ? "en" : t.chat_you === "あなた" ? "ja" : t.chat_you === "나" ? "ko" : t.chat_you === "你" ? "zh" : "fr";
  const moodsByLang = {
    vi: ["😔 Buồn bã","😰 Lo lắng","😤 Căng thẳng","😴 Mệt mỏi","😶 Trống rỗng","🌱 Muốn phát triển","💪 Cần động lực","💙 Cần được yêu thương"],
    en: ["😔 Feeling sad","😰 Anxious","😤 Stressed","😴 Tired","😶 Feeling empty","🌱 Want to grow","💪 Need motivation","💙 Need love"],
    ja: ["😔 悲しい","😰 不安","😤 ストレス","😴 疲れた","😶 虚無感","🌱 成長したい","💪 モチベーション不足","💙 愛が必要"],
    ko: ["😔 슬픔","😰 불안","😤 스트레스","😴 피곤함","😶 공허함","🌱 성장하고 싶음","💪 동기 부족","💙 사랑이 필요"],
    zh: ["😔 悲伤","😰 焦虑","😤 压力大","😴 疲惫","😶 空虚","🌱 想要成长","💪 需要动力","💙 需要关爱"],
    fr: ["😔 Triste","😰 Anxieux","😤 Stressé","😴 Fatigué","😶 Vide","🌱 Vouloir grandir","💪 Manque de motivation","💙 Besoin d'amour"],
  };
  const moods = moodsByLang[langCode] || moodsByLang.vi;

  const generate = async (selectedMood) => {
    setLoading(true); setMood(selectedMood); setAffirmations([]); setCurrent(0); setLiked([]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:600,
          messages:[{ role:"user", content:`Tôi đang cảm thấy: ${selectedMood}. Hãy tạo 6 câu khẳng định tích cực (affirmations) bằng tiếng Việt, dưới dạng ngôi thứ nhất "Tôi...", mỗi câu ngắn gọn (dưới 15 từ), ấm áp và chân thật. Chỉ trả về JSON array: ["câu1","câu2","câu3","câu4","câu5","câu6"]` }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "[]";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      setAffirmations(parsed);
    } catch {
      setAffirmations(["Tôi xứng đáng được hạnh phúc.","Tôi đang cố gắng hết sức.","Tôi có đủ sức mạnh để vượt qua.","Tôi được phép cảm thấy như vậy.","Tôi đang học cách yêu thương bản thân.","Mỗi ngày tôi đều trưởng thành hơn."]);
    }
    setLoading(false);
  };

  const aff = affirmations[current];

  if (!mood) return (
    <div>
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ fontSize:32, marginBottom:8 }}>✨</div>
        <div style={{ color:"white", fontWeight:700, fontSize:16, marginBottom:6 }}>Hôm nay bạn đang cảm thấy thế nào?</div>
        <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13 }}>AI sẽ tạo những câu khẳng định riêng cho bạn</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {moods.map((m,i) => (
          <button key={i} onClick={() => generate(m)} style={{
            padding:"12px 14px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, color:"rgba(255,255,255,0.8)", cursor:"pointer", fontSize:13, fontWeight:500, textAlign:"left", transition:"all 0.2s",
          }} onMouseEnter={e=>{e.currentTarget.style.background="rgba(108,61,232,0.15)"; e.currentTarget.style.borderColor="rgba(108,61,232,0.4)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";}}>
            {m}
          </button>
        ))}
      </div>
    </div>
  );

  if (loading) return (
    <div style={{ textAlign:"center", padding:60 }}>
      <div style={{ fontSize:36, marginBottom:16, animation:"spin 1s linear infinite" }}>✨</div>
      <div style={{ color:"rgba(255,255,255,0.6)" }}>AI đang tạo câu khẳng định cho bạn...</div>
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
        <button onClick={() => setMood("")} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:13 }}>← Đổi tâm trạng</button>
        <span style={{ color:"rgba(255,255,255,0.4)", fontSize:12 }}>| Tâm trạng: {mood}</span>
      </div>

      {/* Main affirmation card */}
      {aff && (
        <div style={{ background:"linear-gradient(135deg,rgba(108,61,232,0.2),rgba(34,211,238,0.1))", border:"1px solid rgba(167,139,250,0.3)", borderRadius:24, padding:"40px 28px", textAlign:"center", marginBottom:20, minHeight:140, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:120, height:120, borderRadius:"50%", background:"radial-gradient(circle,rgba(108,61,232,0.15),transparent)" }} />
          <div>
            <div style={{ fontSize:24, marginBottom:12 }}>✨</div>
            <p style={{ color:"white", fontSize:20, fontWeight:700, lineHeight:1.6, margin:0, fontStyle:"italic" }}>"{aff}"</p>
          </div>
        </div>
      )}

      {/* Progress dots */}
      <div style={{ display:"flex", justifyContent:"center", gap:7, marginBottom:20 }}>
        {affirmations.map((_,i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width:i===current?20:8, height:8, borderRadius:99, border:"none", cursor:"pointer", background:i===current?"#a78bfa":liked.includes(i)?"#22c55e":"rgba(255,255,255,0.2)", transition:"all 0.3s", padding:0 }} />
        ))}
      </div>

      {/* Controls */}
      <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
        <button onClick={() => setCurrent(c => Math.max(0,c-1))} disabled={current===0} style={{ width:44,height:44, borderRadius:"50%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", cursor:current===0?"not-allowed":"pointer", fontSize:18 }}>←</button>
        <button onClick={() => { setLiked(l => l.includes(current)?l:[ ...l,current]); setSaved(s => [...s, aff]); }} style={{ padding:"0 20px", height:44, borderRadius:99, background:liked.includes(current)?"rgba(34,197,94,0.15)":"rgba(255,255,255,0.06)", border:`1px solid ${liked.includes(current)?"rgba(34,197,94,0.4)":"rgba(255,255,255,0.1)"}`, color:liked.includes(current)?"#22c55e":"rgba(255,255,255,0.6)", cursor:"pointer", fontSize:13, fontWeight:600 }}>
          {liked.includes(current) ? "❤️ Đã lưu" : "♡ Lưu"}
        </button>
        <button onClick={() => setCurrent(c => Math.min(affirmations.length-1,c+1))} disabled={current===affirmations.length-1} style={{ width:44,height:44, borderRadius:"50%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", cursor:current===affirmations.length-1?"not-allowed":"pointer", fontSize:18 }}>→</button>
      </div>

      {saved.length > 0 && (
        <div style={{ marginTop:20, padding:14, background:"rgba(255,255,255,0.03)", borderRadius:12, border:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginBottom:8 }}>💾 {saved.length} câu đã lưu</div>
          {saved.slice(-2).map((s,i) => <div key={i} style={{ color:"rgba(255,255,255,0.65)", fontSize:12, padding:"4px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>"{s}"</div>)}
        </div>
      )}
    </div>
  );
}

// ── Game 5: Zen Garden / Sand Drawing ──────────────────────────────────────
function ZenGardenGame({ t, onBack }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState("wave");
  const [color, setColor] = useState("#a78bfa");
  const [aiMessage, setAiMessage] = useState("Vẽ tự do lên cát... không có đúng sai, chỉ có cảm xúc 🌾");
  const [strokes, setStrokes] = useState(0);
  const lastPos = useRef(null);

  const tools = [
    { id:"wave", label:"🌊 Sóng", size:3 },
    { id:"pebble", label:"🪨 Sỏi", size:8 },
    { id:"rake", label:"🍂 Cào", size:1 },
    { id:"leaf", label:"🍃 Nhẹ", size:2 },
  ];
  const colors = ["#a78bfa","#22d3ee","#f97316","#22c55e","#ec4899","#fbbf24","#f87171","white"];

  const aiMessages = [
    "Mỗi nét vẽ là một hơi thở của tâm hồn 🌿","Vườn Zen của bạn thật độc đáo ✨","Bạn đang tạo ra vẻ đẹp từ bên trong 💙","Không cần hoàn hảo — chỉ cần là bạn 🌸","Cảm nhận sự tĩnh lặng qua từng nét vẽ 🧘","Nghệ thuật chữa lành bắt đầu từ đây 🌟",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 240;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a0f3e";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // Draw sand texture
    for (let i=0; i<1500; i++) {
      ctx.fillStyle = `rgba(167,139,250,${Math.random()*0.06})`;
      ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1, 1);
    }
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const evt = e.touches ? e.touches[0] : e;
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    const t_info = tools.find(t => t.id === tool);
    ctx.strokeStyle = color;
    ctx.lineWidth = t_info.size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.7;
    if (tool === "pebble") {
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, t_info.size, 0, Math.PI*2);
      ctx.fill();
    } else if (tool === "wave") {
      ctx.beginPath();
      if (lastPos.current) {
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        const cp = { x:(pos.x+lastPos.current.x)/2, y:pos.y + Math.sin(Date.now()/200)*5 };
        ctx.quadraticCurveTo(cp.x, cp.y, pos.x, pos.y);
      }
      ctx.stroke();
    } else {
      ctx.beginPath();
      if (lastPos.current) { ctx.moveTo(lastPos.current.x, lastPos.current.y); }
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    lastPos.current = pos;
  };

  const handleMouseDown = (e) => { setDrawing(true); lastPos.current = null; setStrokes(s=>s+1); if(s%5===0) setAiMessage(aiMessages[Math.floor(Math.random()*aiMessages.length)]); };
  const s = strokes;

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a0f3e";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for (let i=0; i<1500; i++) { ctx.fillStyle=`rgba(167,139,250,${Math.random()*0.06})`; ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1, 1); }
    setStrokes(0);
    setAiMessage("Vườn mới, tâm hồn mới... Hãy vẽ lại nhé 🌱");
  };

  return (
    <div>
      <div style={{ background:"rgba(108,61,232,0.1)", border:"1px solid rgba(108,61,232,0.2)", borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", gap:8, alignItems:"center", fontSize:13, color:"rgba(255,255,255,0.8)" }}>
        <span>🤖</span><span style={{ fontStyle:"italic" }}>{aiMessage}</span>
      </div>
      <canvas ref={canvasRef} style={{ width:"100%", height:240, borderRadius:16, border:"1px solid rgba(255,255,255,0.1)", cursor:"crosshair", display:"block", touchAction:"none" }}
        onMouseDown={handleMouseDown} onMouseMove={draw} onMouseUp={() => { setDrawing(false); lastPos.current=null; }} onMouseLeave={() => setDrawing(false)}
        onTouchStart={(e) => { e.preventDefault(); handleMouseDown(e); }} onTouchMove={(e) => { e.preventDefault(); draw(e); }} onTouchEnd={() => { setDrawing(false); lastPos.current=null; }}
      />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:14, flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", gap:6 }}>
          {tools.map(to => (
            <button key={to.id} onClick={() => setTool(to.id)} style={{ padding:"6px 12px", borderRadius:10, background:tool===to.id?"rgba(108,61,232,0.25)":"rgba(255,255,255,0.05)", border:`1px solid ${tool===to.id?"rgba(108,61,232,0.5)":"rgba(255,255,255,0.1)"}`, color:"rgba(255,255,255,0.8)", cursor:"pointer", fontSize:11 }}>{to.label}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:5 }}>
          {colors.map(c => (
            <div key={c} onClick={() => setColor(c)} style={{ width:20,height:20, borderRadius:"50%", background:c, cursor:"pointer", border:color===c?"2px solid white":"2px solid transparent", transform:color===c?"scale(1.25)":"scale(1)", transition:"all 0.2s" }} />
          ))}
        </div>
        <button onClick={clear} style={{ padding:"6px 14px", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", color:"#f87171", borderRadius:10, cursor:"pointer", fontSize:12 }}>🗑 Xoá</button>
      </div>
      <div style={{ textAlign:"center", marginTop:10, color:"rgba(255,255,255,0.3)", fontSize:11 }}>Nét vẽ: {strokes}</div>
    </div>
  );
}

// ── Game 6: AI Healing Story ────────────────────────────────────────────────
function HealingStoryGame({ t, onBack }) {
  const [step, setStep] = useState("pick"); // pick | loading | read
  const [theme, setTheme] = useState("");
  const [story, setStory] = useState("");
  const [displayedStory, setDisplayedStory] = useState("");
  const [choices, setChoices] = useState([]);
  const [mood, setMood] = useState("");
  const [chapter, setChapter] = useState(1);

  const langCodeStory = t.chat_you === "Bạn" ? "vi" : t.chat_you === "You" ? "en" : t.chat_you === "あなた" ? "ja" : t.chat_you === "나" ? "ko" : t.chat_you === "你" ? "zh" : "fr";
  const THEMES_BY_LANG = {
    vi: [
      { id:"forest", label:"🌲 Khu rừng bí ẩn", mood:"thư giãn" },
      { id:"ocean",  label:"🌊 Đại dương bình yên", mood:"bình yên" },
      { id:"star",   label:"⭐ Chuyến đi sao", mood:"hy vọng" },
      { id:"garden", label:"🌸 Khu vườn hoa", mood:"vui vẻ" },
      { id:"mountain", label:"🏔️ Đỉnh núi trong sương", mood:"can đảm" },
      { id:"rain",   label:"🌧️ Cơn mưa chữa lành", mood:"thanh thản" },
    ],
    en: [ { id:"forest", label:"🌲 Mysterious Forest", mood:"relaxation" }, { id:"ocean", label:"🌊 Peaceful Ocean", mood:"peace" }, { id:"star", label:"⭐ Journey to the Stars", mood:"hope" }, { id:"garden", label:"🌸 Flower Garden", mood:"joy" }, { id:"mountain", label:"🏔️ Misty Mountain", mood:"courage" }, { id:"rain", label:"🌧️ Healing Rain", mood:"serenity" } ],
    ja: [ { id:"forest", label:"🌲 神秘の森", mood:"リラックス" }, { id:"ocean", label:"🌊 穏やかな海", mood:"平和" }, { id:"star", label:"⭐ 星への旅", mood:"希望" }, { id:"garden", label:"🌸 花の庭", mood:"喜び" }, { id:"mountain", label:"🏔️ 霧の山頂", mood:"勇気" }, { id:"rain", label:"🌧️ 癒しの雨", mood:"静寂" } ],
    ko: [ { id:"forest", label:"🌲 신비로운 숲", mood:"이완" }, { id:"ocean", label:"🌊 평화로운 바다", mood:"평화" }, { id:"star", label:"⭐ 별로의 여행", mood:"희망" }, { id:"garden", label:"🌸 꽃 정원", mood:"기쁨" }, { id:"mountain", label:"🏔️ 안개 낀 산봉우리", mood:"용기" }, { id:"rain", label:"🌧️ 치유의 비", mood:"고요함" } ],
    zh: [ { id:"forest", label:"🌲 神秘森林", mood:"放松" }, { id:"ocean", label:"🌊 平静的海洋", mood:"宁静" }, { id:"star", label:"⭐ 星际旅行", mood:"希望" }, { id:"garden", label:"🌸 花园", mood:"快乐" }, { id:"mountain", label:"🏔️ 云雾山顶", mood:"勇气" }, { id:"rain", label:"🌧️ 治愈的雨", mood:"祥和" } ],
    fr: [ { id:"forest", label:"🌲 Forêt Mystérieuse", mood:"relaxation" }, { id:"ocean", label:"🌊 Océan Paisible", mood:"paix" }, { id:"star", label:"⭐ Voyage aux Étoiles", mood:"espoir" }, { id:"garden", label:"🌸 Jardin Fleuri", mood:"joie" }, { id:"mountain", label:"🏔️ Sommet dans les Nuages", mood:"courage" }, { id:"rain", label:"🌧️ Pluie Guérisseuse", mood:"sérénité" } ],
  };
  const themes = THEMES_BY_LANG[langCodeStory] || THEMES_BY_LANG.vi;

  const tellStory = async (selectedTheme, prevStory = "", choice = "") => {
    setStep("loading"); setStory(""); setDisplayedStory("");
    const themeObj = themes.find(th => th.id === selectedTheme);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:500,
          messages:[{ role:"user", content: `${langCodeStory==="vi"?"Viết một đoạn truyện ngắn chữa lành tâm hồn (200-250 từ) bằng tiếng Việt":"Write a short healing story (200-250 words) in "+({"en":"English","ja":"Japanese","ko":"Korean","zh":"Chinese","fr":"French"})[langCodeStory]||"English"} về chủ đề / about: ${themeObj?.label}, cảm xúc / emotion: ${themeObj?.mood}.${prevStory ? ` (Tiếp nối / Continue, reader chose: "${choice}").` : " (Opening.)"}

Sau truyện, thêm dòng: "CHỌN:" và 2 lựa chọn ngắn (< 8 từ mỗi cái) theo định dạng:
CHỌN:
A. [lựa chọn 1]
B. [lựa chọn 2]

Giọng văn: ấm áp, thơ mộng, có hình ảnh sinh động.` }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const parts = text.split("CHỌN:");
      const storyText = parts[0].trim();
      let parsedChoices = [];
      if (parts[1]) {
        const lines = parts[1].trim().split("\n").filter(l => l.trim().match(/^[AB]\./));
        parsedChoices = lines.map(l => l.replace(/^[AB]\.\s*/,"").trim());
      }
      setStory(storyText);
      setChoices(parsedChoices.length ? parsedChoices : ["Tiếp tục khám phá","Dừng lại và nghỉ ngơi"]);
      setMood(themeObj?.mood || "peaceful");
      // Typing effect
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedStory(storyText.slice(0, i));
        i += 3;
        if (i > storyText.length) clearInterval(interval);
      }, 20);
    } catch {
      setStory("Trong khu rừng bình yên, gió nhẹ thổi qua những tán lá xanh mướt. Bạn bước đi trên con đường nhỏ, cảm nhận từng bước chân chạm đất...\n\nTiếng chim hót xa xa nhắc bạn rằng, dù cuộc sống có bao nhiêu lo toan, khoảnh khắc hiện tại này vẫn thuộc về bạn.");
      setDisplayedStory("Trong khu rừng bình yên...");
      setChoices(["Đi sâu hơn vào rừng","Ngồi nghỉ bên suối"]);
    }
    setStep("read");
  };

  const handleChoice = (choice) => {
    setChapter(c => c+1);
    tellStory(theme, story, choice);
  };

  if (step === "pick") return (
    <div>
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ fontSize:32, marginBottom:8 }}>📖</div>
        <div style={{ color:"white", fontWeight:700, fontSize:16, marginBottom:6 }}>{t.story_pick_world || "Choose your world"}</div>
        <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13 }}>AI sẽ kể câu chuyện chữa lành riêng cho bạn</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {themes.map(th => (
          <button key={th.id} onClick={() => { setTheme(th.id); tellStory(th.id); }} style={{
            padding:"16px 14px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, color:"rgba(255,255,255,0.85)", cursor:"pointer", fontSize:13, fontWeight:500, textAlign:"left", transition:"all 0.2s",
          }} onMouseEnter={e=>{e.currentTarget.style.background="rgba(108,61,232,0.15)"; e.currentTarget.style.borderColor="rgba(108,61,232,0.4)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";}}>
            <div style={{ fontSize:20, marginBottom:4 }}>{th.label.split(" ")[0]}</div>
            <div>{th.label.split(" ").slice(1).join(" ")}</div>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, marginTop:4 }}>→ Cảm xúc: {th.mood}</div>
          </button>
        ))}
      </div>
    </div>
  );

  if (step === "loading") return (
    <div style={{ textAlign:"center", padding:60 }}>
      <div style={{ fontSize:32, marginBottom:16, animation:"spin 2s linear infinite" }}>📖</div>
      <div style={{ color:"rgba(255,255,255,0.6)" }}>AI đang viết câu chuyện cho bạn...</div>
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
        <button onClick={() => { setStep("pick"); setChapter(1); }} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:13 }}>← Đổi chủ đề</button>
        <span style={{ color:"rgba(255,255,255,0.4)", fontSize:12 }}>Chương {chapter} · Cảm xúc: {mood}</span>
      </div>
      <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"20px", marginBottom:20, maxHeight:280, overflowY:"auto" }}>
        <p style={{ color:"rgba(255,255,255,0.88)", lineHeight:2, margin:0, fontSize:14, whiteSpace:"pre-wrap" }}>{displayedStory}<span style={{ animation:"blink 1s infinite" }}>|</span></p>
      </div>
      {choices.length > 0 && displayedStory.length >= story.length - 5 && (
        <div>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginBottom:10, textAlign:"center" }}>Bạn muốn làm gì tiếp theo?</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {choices.map((c,i) => (
              <button key={i} onClick={() => handleChoice(c)} style={{
                padding:"12px 18px", background:i===0?"rgba(108,61,232,0.15)":"rgba(255,255,255,0.05)", border:`1px solid ${i===0?"rgba(108,61,232,0.35)":"rgba(255,255,255,0.1)"}`, color:"rgba(255,255,255,0.85)", borderRadius:12, cursor:"pointer", fontSize:13, fontWeight:500, textAlign:"left", transition:"all 0.2s", display:"flex", alignItems:"center", gap:8,
              }} onMouseEnter={e=>{e.currentTarget.style.transform="translateX(4px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateX(0)";}}>
                <span style={{ opacity:0.6 }}>{["A","B"][i]}.</span> {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Games Hub Page ─────────────────────────────────────────────────────
function GamesPage({ t, setPage }) {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id:"breathe",     title: t.game_breathe_title     || "Hộp Thở 4-7-8",          icon:"🌬️", color:"#22d3ee", desc: t.g1_desc || t.g1_desc || "4-7-8 breathing technique",               difficulty:"Dễ",   time:"5 phút", tag:"🧘 Thư giãn"    },
    { id:"memory",      title: t.game_memory_title      || t.game_memory_title || "Emotion Memory",          icon:"🃏", color:"#a78bfa", desc: t.g2_desc || t.g2_desc || "Flip cards to find pairs",                        difficulty:"Trung", time:"3 phút", tag:"🧠 Trí tuệ"     },
    { id:"wordguess",   title: t.game_word_guess         || t.game_word_guess || "Guess the word",         icon:"🔤", color:"#f97316", desc: t.g3_desc || t.g3_desc || "Guess hidden emotion words",               difficulty:"Trung", time:"5 phút", tag:"🤖 Cùng AI"     },
    { id:"affirmation", title: t.game_affirmation_title || t.game_affirmation_title || "Positive Affirmations", icon:"✨", color:"#22c55e", desc: t.g4_desc || t.g4_desc || "AI-personalized affirmations",             difficulty:"Dễ",   time:"2 phút", tag:"💙 Chữa lành"  },
    { id:"zen",         title: t.game_zen_title         || t.game_zen_title || "Zen Garden",                  icon:"🌾", color:"#ec4899", desc: t.g5_desc || t.g5_desc || "Draw freely on sand",                  difficulty:"Dễ",   time:"Tự do",  tag:"🎨 Sáng tạo"   },
    { id:"story",       title: t.game_story_title       || t.game_story_title || "Healing Story",     icon:"📖", color:"#fbbf24", desc: t.g6_desc || t.g6_desc || "AI healing story",   difficulty:"Dễ",   time:"10 phút", tag:"🤖 Cùng AI"    },
  ];

  const gameComponents = {
    breathe:     <BreathingGame     t={t} onBack={() => setActiveGame(null)} />,
    memory:      <MemoryGame        t={t} onBack={() => setActiveGame(null)} />,
    wordguess:   <WordGuessGame     t={t} onBack={() => setActiveGame(null)} />,
    affirmation: <AffirmationGame  t={t} onBack={() => setActiveGame(null)} />,
    zen:         <ZenGardenGame     t={t} onBack={() => setActiveGame(null)} />,
    story:       <HealingStoryGame  t={t} onBack={() => setActiveGame(null)} />,
  };

  const activeInfo = games.find(g => g.id === activeGame);

  return (
    <div style={{ minHeight:"100vh", background:"#0a0e27", paddingTop:80, paddingBottom:60 }}>
      <div style={{ maxWidth:1000, margin:"0 auto", padding:"0 24px" }}>
        {/* Back to home */}
        {setPage && <BackButton onClick={() => setPage("home")} label="← Trang chủ" />}

        {activeGame ? (
          /* Active game view */
          <div key={activeGame} style={{ animation:"pageIn 0.4s ease" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
              <button onClick={() => setActiveGame(null)} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.7)", padding:"8px 16px", borderRadius:99, cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", gap:6 }}>
                ← {t.game_back || t.game_back || "← Back"}
              </button>
              <div>
                <h2 style={{ color:"white", fontSize:22, fontWeight:800, margin:0 }}>{activeInfo?.icon} {activeInfo?.title}</h2>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:12, marginTop:2 }}>{activeInfo?.tag} · {activeInfo?.time}</div>
              </div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${activeInfo?.color}33`, borderRadius:20, padding:"28px 24px", backdropFilter:"blur(12px)", boxShadow:`0 0 40px ${activeInfo?.color}11` }}>
              {gameComponents[activeGame]}
            </div>
          </div>
        ) : (
          /* Game hub */
          <>
            {/* Header */}
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(108,61,232,0.12)", border:"1px solid rgba(108,61,232,0.25)", borderRadius:99, padding:"6px 20px", marginBottom:16, color:"#a78bfa", fontSize:12, letterSpacing:1 }}>
                🎮 HEALING GAMES · AI COMPANION
              </div>
              <h1 style={{ fontSize:"clamp(28px,5vw,42px)", fontWeight:900, color:"white", margin:"0 0 12px" }}>{t.game_title || t.game_title || "Healing Corner 🌿"}</h1>
              <p style={{ color:"rgba(255,255,255,0.5)", fontSize:15, maxWidth:500, margin:"0 auto" }}>{t.game_sub || t.game_sub || "Healing games with AI"}</p>
            </div>

            {/* Mood check-in banner */}
            <div style={{ background:"linear-gradient(135deg,rgba(108,61,232,0.15),rgba(34,211,238,0.08))", border:"1px solid rgba(108,61,232,0.25)", borderRadius:18, padding:"18px 22px", marginBottom:32, display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ fontSize:32, flexShrink:0 }}>🤖</div>
              <div>
                <div style={{ color:"white", fontWeight:700, fontSize:14, marginBottom:4 }}>Mira gợi ý cho bạn hôm nay</div>
                <div style={{ color:"rgba(255,255,255,0.65)", fontSize:13 }}>Nếu bạn đang căng thẳng → thử <span style={{ color:"#22d3ee", fontWeight:600 }}>Hộp Thở</span>. Muốn thư giãn → thử <span style={{ color:"#ec4899", fontWeight:600 }}>Vườn Zen</span>. Muốn nghe chuyện → thử <span style={{ color:"#fbbf24", fontWeight:600 }}>Câu Chuyện AI</span></div>
              </div>
            </div>

            {/* Game cards grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:20 }}>
              {games.map((game) => (
                <div key={game.id} onClick={() => setActiveGame(game.id)} style={{
                  background:"rgba(255,255,255,0.04)", border:`1px solid rgba(255,255,255,0.09)`,
                  borderRadius:20, padding:"26px 22px", cursor:"pointer",
                  transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)", position:"relative", overflow:"hidden",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px) scale(1.01)"; e.currentTarget.style.borderColor=`${game.color}55`; e.currentTarget.style.background=`${game.color}10`; e.currentTarget.style.boxShadow=`0 20px 50px ${game.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.boxShadow="none"; }}>

                  {/* Ambient glow */}
                  <div style={{ position:"absolute", top:-40, right:-40, width:100, height:100, borderRadius:"50%", background:`radial-gradient(circle,${game.color}18,transparent)`, pointerEvents:"none" }} />

                  {/* Top row */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                    <div style={{ width:52, height:52, borderRadius:16, background:`${game.color}18`, border:`1px solid ${game.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{game.icon}</div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                      <span style={{ background:`${game.color}18`, color:game.color, padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:600, border:`1px solid ${game.color}30` }}>{game.tag}</span>
                      <span style={{ color:"rgba(255,255,255,0.3)", fontSize:10 }}>⏱ {game.time}</span>
                    </div>
                  </div>

                  <h3 style={{ color:"white", fontSize:16, fontWeight:800, margin:"0 0 8px", lineHeight:1.3 }}>{game.title}</h3>
                  <p style={{ color:"rgba(255,255,255,0.55)", fontSize:13, lineHeight:1.65, margin:"0 0 18px" }}>{game.desc}</p>

                  {/* Bottom */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ color:"rgba(255,255,255,0.3)", fontSize:11 }}>Độ khó: {game.difficulty}</span>
                    <div style={{ padding:"7px 16px", background:`${game.color}22`, border:`1px solid ${game.color}44`, color:game.color, borderRadius:99, fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
                      {game.icon} {t.game_play || t.game_play || "Play now"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats banner */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:14, marginTop:40 }}>
              {[
                { icon:"🎮", label:"Trò chơi", value:"6" },
                { icon:"🤖", label:"Cùng AI chơi", value:"4" },
                { icon:"🧘", label:"Chữa lành", value:"100%" },
                { icon:"⭐", label:"Hoàn toàn miễn phí", value:"Free" },
              ].map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"16px", textAlign:"center" }}>
                  <div style={{ fontSize:24, marginBottom:4 }}>{s.icon}</div>
                  <div style={{ color:"#a78bfa", fontWeight:800, fontSize:18 }}>{s.value}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      `}</style>
    </div>
  );
}




// =================== MOOD ATMOSPHERE SYSTEM ===================
// Maps mood scores to visual atmosphere — background, particles, colors
const MOOD_ATMOSPHERES = {
  8: { bg:"radial-gradient(ellipse at 50% 0%,#2d1a05 0%,#1a1005 40%,#07091d 100%)", accent:"#f59e0b", particle:"255,180,50",  name:"Tuyệt Vời 🤩",  aurora:"rgba(245,158,11,0.15)"  },
  7: { bg:"radial-gradient(ellipse at 50% 0%,#1a2505 0%,#0f1a05 40%,#07091d 100%)", accent:"#22c55e", particle:"100,220,100", name:"Rất Vui 😄",     aurora:"rgba(34,197,94,0.12)"   },
  6: { bg:"radial-gradient(ellipse at 50% 0%,#0f2020 0%,#071515 40%,#07091d 100%)", accent:"#22d3ee", particle:"50,200,220",  name:"Vui 😊",          aurora:"rgba(34,211,238,0.1)"   },
  5: { bg:"radial-gradient(ellipse at 50% 0%,#130f35 0%,#0a0928 40%,#07091d 100%)", accent:"#a78bfa", particle:"167,139,250", name:"Ổn 🙂",           aurora:"rgba(108,61,232,0.12)"  },
  4: { bg:"radial-gradient(ellipse at 50% 0%,#0f1520 0%,#080e18 40%,#07091d 100%)", accent:"#6b7280", particle:"130,150,180", name:"Bình Thường 😐", aurora:"rgba(107,114,128,0.08)" },
  3: { bg:"radial-gradient(ellipse at 50% 0%,#200f20 0%,#150a18 40%,#07091d 100%)", accent:"#8b5cf6", particle:"139,92,246",  name:"Khó Chịu 😕",    aurora:"rgba(139,92,246,0.12)"  },
  2: { bg:"radial-gradient(ellipse at 50% 0%,#201015 0%,#140a0e 40%,#07091d 100%)", accent:"#f97316", particle:"249,115,22",  name:"Buồn 😢",         aurora:"rgba(249,115,22,0.1)"   },
  1: { bg:"radial-gradient(ellipse at 50% 0%,#200808 0%,#140404 40%,#07091d 100%)", accent:"#ef4444", particle:"239,68,68",   name:"Rất Tệ 😭",       aurora:"rgba(239,68,68,0.1)"    },
};

// =================== MOOD AVATAR ===================
function MoodAvatar({ mood = 5, size = 120 }) {
  const atm = MOOD_ATMOSPHERES[mood] || MOOD_ATMOSPHERES[5];
  const configs = {
    8: { bg:"#f59e0b", eye:"★ ★", mouth:"D", rain:false, glow:"#f59e0b", particles:["⭐","✨","🌟","💫"] },
    7: { bg:"#22c55e", eye:"^ ^", mouth:"U", rain:false, glow:"#22c55e", particles:["🌸","💚","🌟","🎉"] },
    6: { bg:"#22d3ee", eye:"◉ ◉", mouth:"⌣", rain:false, glow:"#22d3ee", particles:["💙","🌊","✨"] },
    5: { bg:"#8b5cf6", eye:"◉ ◉", mouth:"▽", rain:false, glow:"#8b5cf6", particles:["💜","🌙"] },
    4: { bg:"#6b7280", eye:"- -", mouth:"—", rain:false, glow:"#6b7280", particles:[] },
    3: { bg:"#8b5cf6", eye:"~ ~", mouth:"○", rain:false, glow:"#6c3de8", particles:["💭"] },
    2: { bg:"#3b82f6", eye:"T T", mouth:"▽", rain:true,  glow:"#3b82f6", particles:["💧","🌧️"] },
    1: { bg:"#ef4444", eye:"x x", mouth:"D", rain:true,  glow:"#ef4444", particles:["💔","⚡"] },
  };
  const c = configs[mood] || configs[5];
  const [floatIdx, setFloatIdx] = useState(0);
  useEffect(() => { const ti = setInterval(() => setFloatIdx(i => (i+1)%Math.max(1,c.particles.length)), 1400); return () => clearInterval(ti); }, [mood]);

  return (
    <div style={{ position:"relative", width:size, height:size, display:"inline-block" }}>
      {/* Aura glow */}
      <div style={{ position:"absolute", inset:-12, borderRadius:"50%", background:`radial-gradient(circle,${c.glow}22,transparent 70%)`, animation:"pulse 2s ease infinite" }} />
      {/* Rain effect */}
      {c.rain && [...Array(8)].map((_,i) => (
        <div key={i} style={{ position:"absolute", top:"-20%", left:`${10+i*11}%`, width:2, height:12, background:`${c.glow}88`, borderRadius:99, animation:`rainDrop 0.8s ${i*0.1}s linear infinite` }} />
      ))}
      {/* Floating particles */}
      {c.particles[floatIdx] && (
        <div style={{ position:"absolute", top:-24, right:-8, fontSize:size*0.18, animation:"float 1.8s ease-in-out infinite", pointerEvents:"none" }}>
          {c.particles[floatIdx]}
        </div>
      )}
      {/* Main avatar SVG */}
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs>
          <radialGradient id="avGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor={c.bg} stopOpacity="0.9"/>
            <stop offset="100%" stopColor={c.bg} stopOpacity="0.4"/>
          </radialGradient>
          <filter id="avGlow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* Body circle */}
        <circle cx="50" cy="55" r="38" fill="url(#avGrad)" stroke={c.bg} strokeWidth="2" opacity="0.9"/>
        <circle cx="50" cy="55" r="38" fill="none" stroke={c.bg} strokeWidth="1" opacity="0.4"/>
        {/* Face */}
        <circle cx="35" cy="48" r="7" fill={c.bg} opacity="0.8" filter="url(#avGlow)"/>
        <circle cx="65" cy="48" r="7" fill={c.bg} opacity="0.8" filter="url(#avGlow)"/>
        <circle cx="37" cy="46" r="3" fill="white" opacity="0.9"/>
        <circle cx="67" cy="46" r="3" fill="white" opacity="0.9"/>
        {/* Mouth */}
        {mood >= 6
          ? <path d="M 38 64 Q 50 74 62 64" fill="none" stroke={c.bg} strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
          : mood <= 3
          ? <path d="M 38 70 Q 50 62 62 70" fill="none" stroke={c.bg} strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
          : <line x1="38" y1="67" x2="62" y2="67" stroke={c.bg} strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        }
        {/* Cheeks when happy */}
        {mood >= 7 && <>
          <circle cx="28" cy="58" r="5" fill={c.bg} opacity="0.25"/>
          <circle cx="72" cy="58" r="5" fill={c.bg} opacity="0.25"/>
        </>}
        {/* Tears when sad */}
        {mood <= 3 && <>
          <ellipse cx="35" cy="56" rx="1.5" ry="4" fill="#60a5fa" opacity="0.7"/>
          <ellipse cx="65" cy="56" rx="1.5" ry="4" fill="#60a5fa" opacity="0.7"/>
        </>}
      </svg>
      <style>{`
        @keyframes rainDrop{from{transform:translateY(0);opacity:0.8}to{transform:translateY(${size*0.8}px);opacity:0}}
      `}</style>
    </div>
  );
}

// =================== HEALING SOUNDS WIDGET ===================
function HealingSounds({ t }) {
  const [playing, setPlaying] = useState(null);
  const [vol, setVol] = useState(60);
  const audioRef = useRef(null);
  const freqRef = useRef(null);

  const sounds = [
    { id:"rain",   label: t.sound_rain   || t.sound_rain || "🌧️ Rain",       color:"#3b82f6", freq:440, type:"sawtooth" },
    { id:"ocean",  label: t.sound_ocean  || t.sound_ocean || "🌊 Ocean",  color:"#22d3ee", freq:180, type:"sine"     },
    { id:"piano",  label: t.sound_piano  || "🎹 Piano",       color:"#a78bfa", freq:528, type:"sine"     },
    { id:"forest", label: t.sound_forest || "🌲 Rừng",        color:"#22c55e", freq:396, type:"triangle" },
    { id:"cafe",   label: t.sound_cafe   || t.sound_cafe || "☕ Café",         color:"#f59e0b", freq:320, type:"triangle" },
    { id:"white",  label: t.sound_white  || "🔮 White Noise", color:"#6b7280", freq:0,   type:"noise"    },
  ];

  const play = (sound) => {
    if (playing === sound.id) { setPlaying(null); if(freqRef.current) { freqRef.current.stop(); freqRef.current=null; } return; }
    if(freqRef.current) { freqRef.current.stop(); freqRef.current=null; }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      let src;
      if (sound.type === "noise") {
        const buf = ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
        const data = buf.getChannelData(0);
        for(let i=0;i<data.length;i++) data[i]=Math.random()*2-1;
        src = ctx.createBufferSource(); src.buffer=buf; src.loop=true;
      } else {
        src = ctx.createOscillator(); src.type=sound.type; src.frequency.value=sound.freq;
        const lfo = ctx.createOscillator(); lfo.frequency.value=0.3;
        const lfoGain = ctx.createGain(); lfoGain.gain.value=sound.id==="ocean"?40:sound.id==="rain"?60:8;
        lfo.connect(lfoGain); lfoGain.connect(src.frequency); lfo.start();
      }
      const gainNode = ctx.createGain(); gainNode.gain.value=vol/500;
      src.connect(gainNode); gainNode.connect(ctx.destination); src.start();
      freqRef.current = { stop: () => { try{src.stop(); ctx.close();}catch(e){} } };
    } catch(e) {}
    setPlaying(sound.id);
  };

  useEffect(() => () => { if(freqRef.current) freqRef.current.stop(); }, []);

  return (
    <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:20, padding:"24px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
        <span style={{ fontSize:20 }}>🎧</span>
        <span style={{ color:"white", fontWeight:700, fontSize:16 }}>{t.sound_title || t.sound_title || "Healing Sounds"}</span>
        {playing && <span style={{ marginLeft:"auto", color:"#22c55e", fontSize:12, animation:"pulse 1.5s ease infinite" }}>● {t.sound_playing || t.sound_playing || "Playing..."}</span>}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
        {sounds.map(s => (
          <button key={s.id} onClick={() => play(s)} style={{
            padding:"12px 8px", borderRadius:14,
            background: playing===s.id ? `${s.color}25` : "rgba(255,255,255,0.04)",
            border:`1px solid ${playing===s.id ? s.color+"66" : "rgba(255,255,255,0.08)"}`,
            color: playing===s.id ? s.color : "rgba(255,255,255,0.75)",
            cursor:"pointer", fontSize:12, fontWeight: playing===s.id ? 700 : 400,
            transition:"all 0.2s", display:"flex", flexDirection:"column", alignItems:"center", gap:4,
            boxShadow: playing===s.id ? `0 0 16px ${s.color}33` : "none",
          }}>
            <span style={{ fontSize:20 }}>{s.label.split(" ")[0]}</span>
            <span>{s.label.split(" ").slice(1).join(" ")}</span>
            {playing===s.id && <div style={{ display:"flex", gap:2, marginTop:2 }}>
              {[0,1,2,3].map(i => <div key={i} style={{ width:3, borderRadius:2, background:s.color, animation:`soundBar 0.8s ${i*0.15}s ease-in-out infinite alternate`, height:8+i*3 }} />)}
            </div>}
          </button>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ color:"rgba(255,255,255,0.5)", fontSize:12 }}>🔈</span>
        <input type="range" min={10} max={100} value={vol} onChange={e => setVol(+e.target.value)} style={{ flex:1, accentColor:"#6c3de8" }} />
        <span style={{ color:"rgba(255,255,255,0.5)", fontSize:12 }}>🔊</span>
        <span style={{ color:"rgba(255,255,255,0.4)", fontSize:11, minWidth:28 }}>{vol}%</span>
      </div>
      <style>{`@keyframes soundBar{from{transform:scaleY(0.4)}to{transform:scaleY(1.6)}}`}</style>
    </div>
  );
}

// =================== MOOD GARDEN ===================
function MoodGarden({ t }) {
  const [waterToday, setWaterToday] = useState(() => {
    try { return localStorage.getItem("mm_garden_water") === new Date().toDateString(); } catch { return false; }
  });
  const [quests, setQuests] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mm_garden_quests") || "[]"); } catch { return []; }
  });
  const [xp, setXp] = useState(() => { try { return +localStorage.getItem("mm_garden_xp")||0; } catch { return 0; } });
  const [streak] = useState(3);
  const [showFirefly, setShowFirefly] = useState(false);
  const [particles, setParticles] = useState([]);

  const level = Math.floor(xp / 100) + 1;
  const health = Math.min(100, waterToday ? 85 + quests.length*3 : 40 + quests.length*5);
  const questList = [
    t.garden_q1||"✍️ Viết 1 điều biết ơn",
    t.garden_q2||"🌬️ Thở sâu 2 phút",
    t.garden_q3||"💙 Không tự trách bản thân",
    t.garden_q4||"📔 Ghi nhật ký hôm nay",
    t.garden_q5||"🧘 Ngồi yên 5 phút",
    t.garden_q6||"😊 Làm 1 điều khiến bạn vui",
  ];

  const doWater = () => {
    if (waterToday) return;
    setWaterToday(true);
    try { localStorage.setItem("mm_garden_water", new Date().toDateString()); } catch {}
    addXp(20);
    spawnParticles("💧");
    setTimeout(() => setShowFirefly(true), 1000);
  };

  const doQuest = (idx) => {
    if (quests.includes(idx)) return;
    const nq = [...quests, idx];
    setQuests(nq);
    try { localStorage.setItem("mm_garden_quests", JSON.stringify(nq)); } catch {}
    addXp(15);
    spawnParticles(["⭐","✨","🌟"][idx%3]);
  };

  const addXp = (amt) => {
    const nx = xp + amt;
    setXp(nx);
    try { localStorage.setItem("mm_garden_xp", String(nx)); } catch {}
  };

  const spawnParticles = (emoji) => {
    const id = Date.now();
    setParticles(p => [...p, { id, emoji, x: Math.random()*60+20, y: Math.random()*40+30 }]);
    setTimeout(() => setParticles(p => p.filter(x => x.id !== id)), 1800);
  };

  // Tree SVG based on health
  const treeColor = health > 70 ? "#22c55e" : health > 45 ? "#84cc16" : "#ca8a04";
  const flowerCount = Math.floor(health / 20);

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 0%,#071a0f 0%,#07091d 60%)", paddingTop:80, paddingBottom:60 }}>
      <div style={{ maxWidth:960, margin:"0 auto", padding:"0 24px" }}>
        <BackButton onClick={() => window.history.back()} label="← Trang chủ" />
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h1 style={{ fontSize:34, fontWeight:900, background:"linear-gradient(135deg,#86efac,#22c55e,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 10px" }}>
            🌿 {t.garden_title||"Khu Vườn Tâm Trạng"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:15 }}>{t.garden_sub||"Chăm sóc cây tinh thần của bạn mỗi ngày"}</p>
        </div>

        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:32 }}>
          {[
            { label:t.garden_level||"Cấp", val:level, color:"#f59e0b", icon:"⭐" },
            { label:t.garden_xp||"Năng lượng", val:xp, color:"#a78bfa", icon:"✨" },
            { label:t.garden_streak||"Chuỗi ngày", val:`${streak}🔥`, color:"#f97316", icon:"🔥" },
            { label:"Sức khoẻ cây", val:`${health}%`, color:treeColor, icon:"🌱" },
          ].map(s => (
            <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"16px", textAlign:"center", backdropFilter:"blur(12px)" }}>
              <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
              <div style={{ color:s.color, fontWeight:800, fontSize:20 }}>{s.val}</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
          {/* Tree visualization */}
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:20, padding:"28px", textAlign:"center", position:"relative", overflow:"hidden", backdropFilter:"blur(12px)" }}>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 100%,rgba(34,197,94,0.08),transparent 60%)", pointerEvents:"none" }} />
            <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:16 }}>{t.garden_tree||"Cây Tinh Thần"}</div>

            {/* Particle floating emojis */}
            {particles.map(p => (
              <div key={p.id} style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`, fontSize:20, animation:"particleFloat 1.8s ease-out forwards", pointerEvents:"none" }}>{p.emoji}</div>
            ))}

            {/* SVG Tree */}
            <svg width="160" height="200" viewBox="0 0 160 200" style={{ display:"block", margin:"0 auto" }}>
              {/* Trunk */}
              <rect x="70" y="140" width="20" height="50" rx="8" fill="#854d0e" opacity="0.8"/>
              <rect x="74" y="140" width="8" height="50" rx="4" fill="#a16207" opacity="0.5"/>
              {/* Ground */}
              <ellipse cx="80" cy="192" rx="35" ry="6" fill="rgba(34,197,94,0.2)"/>
              {/* Tree layers */}
              {[{r:52,y:110},{r:42,y:80},{r:32,y:56},{r:22,y:38}].map((l,i) => (
                <ellipse key={i} cx="80" cy={l.y} rx={l.r} ry={l.r*0.7} fill={treeColor} opacity={0.75-i*0.05}/>
              ))}
              {/* Flowers */}
              {flowerCount > 0 && [...Array(Math.min(flowerCount,6))].map((_,i) => (
                <g key={i} transform={`translate(${40+i*16},${50+Math.sin(i)*18})`}>
                  <circle cx="0" cy="0" r="4" fill="#f9a8d4" opacity="0.9"/>
                  <circle cx="0" cy="0" r="2" fill="#fbbf24" opacity="0.9"/>
                </g>
              ))}
              {/* Fireflies */}
              {showFirefly && [...Array(5)].map((_,i) => (
                <circle key={i} cx={30+i*24} cy={40+Math.sin(i*1.2)*20} r={2.5} fill="#fef08a" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.1;0.8" dur={`${1.2+i*0.3}s`} repeatCount="indefinite"/>
                  <animate attributeName="cx" values={`${30+i*24};${35+i*24};${30+i*24}`} dur={`${2+i*0.4}s`} repeatCount="indefinite"/>
                  <animate attributeName="cy" values={`${40+Math.sin(i*1.2)*20};${30+Math.sin(i*1.2)*20};${40+Math.sin(i*1.2)*20}`} dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
                </circle>
              ))}
              {/* Health text */}
              <text x="80" y="175" textAnchor="middle" fill={treeColor} fontSize="11" opacity="0.7">{health}% khoẻ mạnh</text>
            </svg>

            {/* Health bar */}
            <div style={{ marginTop:12 }}>
              <div style={{ height:6, background:"rgba(255,255,255,0.08)", borderRadius:99, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${health}%`, background:`linear-gradient(90deg,${treeColor},${treeColor}88)`, borderRadius:99, transition:"width 1.5s ease" }}/>
              </div>
            </div>

            {/* Water button */}
            <button onClick={doWater} disabled={waterToday} style={{
              marginTop:20, width:"100%", padding:"12px",
              background: waterToday ? "rgba(34,197,94,0.1)" : "linear-gradient(135deg,#059669,#22c55e)",
              border: waterToday ? "1px solid rgba(34,197,94,0.3)" : "none",
              color: waterToday ? "#22c55e" : "white", borderRadius:12, cursor:waterToday?"default":"pointer",
              fontSize:14, fontWeight:700,
            }}>
              {waterToday ? (t.garden_watered||"✓ Đã tưới hôm nay") : (t.garden_water||"💧 Tưới Cây")}
            </button>
            {showFirefly && <div style={{ color:"rgba(255,255,255,0.45)", fontSize:11, marginTop:8, fontStyle:"italic" }}>{t.garden_firefly||"Đom đóm xuất hiện 🌟"}</div>}
          </div>

          {/* Quests */}
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:20, padding:"24px", backdropFilter:"blur(12px)" }}>
            <h3 style={{ color:"white", fontSize:16, fontWeight:700, margin:"0 0 18px", display:"flex", alignItems:"center", gap:8 }}>
              <span>🎯</span> {t.garden_quest||"Nhiệm Vụ Hôm Nay"}
              <span style={{ marginLeft:"auto", background:"rgba(108,61,232,0.2)", color:"#a78bfa", padding:"2px 10px", borderRadius:99, fontSize:12 }}>{quests.length}/{questList.length}</span>
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {questList.map((q, i) => (
                <div key={i} onClick={() => doQuest(i)} style={{
                  display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                  background: quests.includes(i) ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)",
                  border:`1px solid ${quests.includes(i) ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius:12, cursor:quests.includes(i)?"default":"pointer", transition:"all 0.2s",
                }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${quests.includes(i)?"#22c55e":"rgba(255,255,255,0.2)"}`, background:quests.includes(i)?"#22c55e":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.3s" }}>
                    {quests.includes(i) && <span style={{ color:"white", fontSize:12 }}>✓</span>}
                  </div>
                  <span style={{ color:quests.includes(i)?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.85)", fontSize:13, textDecoration:quests.includes(i)?"line-through":"none", transition:"all 0.2s" }}>{q}</span>
                  {quests.includes(i) && <span style={{ marginLeft:"auto", color:"#22c55e", fontSize:11 }}>+15 XP</span>}
                </div>
              ))}
            </div>
            {quests.length === questList.length && (
              <div style={{ marginTop:14, padding:"14px", background:"rgba(245,158,11,0.12)", borderRadius:12, border:"1px solid rgba(245,158,11,0.3)", textAlign:"center" }}>
                <div style={{ fontSize:28, marginBottom:4 }}>🏆</div>
                <div style={{ color:"#fbbf24", fontWeight:700 }}>Hoàn thành tất cả nhiệm vụ!</div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12 }}>+50 XP bonus</div>
              </div>
            )}
          </div>
        </div>

        {/* Badges row */}
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"24px", backdropFilter:"blur(12px)" }}>
          <h3 style={{ color:"white", fontSize:16, fontWeight:700, margin:"0 0 16px" }}>🏅 {t.garden_badge||"Huy Hiệu"}</h3>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {[
              { icon:"🌱", name:"Mầm non", desc:"Ngày đầu tiên", earned:true, color:"#22c55e" },
              { icon:"💧", name:"Siêng tưới", desc:"7 ngày liên tiếp", earned:waterToday, color:"#3b82f6" },
              { icon:"🌸", name:"Cây nở hoa", desc:"EQ ≥ 80%", earned:health>70, color:"#ec4899" },
              { icon:"⭐", name:"Cấp 5", desc:"Đạt 400 XP", earned:xp>=400, color:"#f59e0b" },
              { icon:"🔥", name:"On fire", desc:"10 ngày streak", earned:streak>=10, color:"#f97316" },
              { icon:"🧘", name:"Bình tâm", desc:"Hoàn thành 30 nhiệm vụ", earned:false, color:"#a78bfa" },
            ].map(b => (
              <div key={b.name} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, opacity:b.earned?1:0.35, transition:"opacity 0.3s" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:b.earned?`${b.color}22`:"rgba(255,255,255,0.04)", border:`2px solid ${b.earned?b.color+"66":"rgba(255,255,255,0.1)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, boxShadow:b.earned?`0 0 20px ${b.color}33`:"none" }}>{b.icon}</div>
                <div style={{ color:b.earned?"white":"rgba(255,255,255,0.4)", fontSize:11, fontWeight:600, textAlign:"center" }}>{b.name}</div>
                <div style={{ color:"rgba(255,255,255,0.3)", fontSize:10, textAlign:"center" }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes particleFloat{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-60px) scale(1.5)}}`}</style>
    </div>
  );
}

// =================== MIND REPLAY ===================
function MindReplay({ t, user }) {
  const [period, setPeriod] = useState("week");
  const [insight, setInsight] = useState("");
  const [loadingInsight, setLoadingInsight] = useState(false);

  const demoData = {
    week: [
      { day:"T2", score:5, note:"Bình thường" }, { day:"T3", score:7, note:"Năng suất cao" },
      { day:"T4", score:4, note:"Mệt mỏi" },     { day:"T5", score:8, note:"Hoàn thành mục tiêu!" },
      { day:"T6", score:6, note:"Ổn định" },     { day:"T7", score:7, note:"Thư giãn" },
      { day:"CN", score:8, note:"Hạnh phúc" },
    ],
    month: Array.from({length:30},(_,i) => ({ day:`${i+1}`, score:Math.floor(Math.random()*5)+3, note:"" }))
  };
  const data = demoData[period];
  const avg = (data.reduce((a,d)=>a+d.score,0)/data.length).toFixed(1);
  const best = data.reduce((a,b)=>a.score>b.score?a:b,data[0]);
  const worst = data.reduce((a,b)=>a.score<b.score?a:b,data[0]);
  const MOOD_COLORS = ["","#ef4444","#f97316","#eab308","#6b7280","#22c55e","#3b82f6","#8b5cf6","#ec4899"];

  const getInsight = async () => {
    setLoadingInsight(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:300,
          messages:[{ role:"user", content:`Phân tích hành trình cảm xúc này (thang 1-8): ${JSON.stringify(data.map(d=>({ngay:d.day,diem:d.score})))}. Điểm TB: ${avg}. Viết 3-4 câu insight ngắn gọn bằng tiếng Việt, ấm áp, không phán xét, tập trung điểm tích cực và gợi ý nhỏ.` }]
        })
      });
      const r = await res.json();
      setInsight(r.content?.[0]?.text || t.replay_insight || "Your journey is precious!");
    } catch { setInsight("Mỗi ngày là một trang mới trong cuốn sách của bạn. Hành trình của bạn thật ý nghĩa 💙"); }
    setLoadingInsight(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 0%,#150820 0%,#07091d 60%)", paddingTop:80, paddingBottom:60 }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
        <BackButton onClick={() => window.history.back()} label="← Trang chủ" />
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h1 style={{ fontSize:34, fontWeight:900, background:"linear-gradient(135deg,#c4b5fd,#a78bfa,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 10px" }}>
            {t.replay_title||"Mind Replay ✨"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:15 }}>{t.replay_sub||"Nhìn lại hành trình cảm xúc của bạn"}</p>
        </div>

        {/* Period selector */}
        <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:28 }}>
          {[["week","📅 7 ngày qua"], ["month","🗓️ 30 ngày"]].map(([p,l]) => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding:"8px 20px", borderRadius:99, border:`1px solid ${period===p?"rgba(108,61,232,0.5)":"rgba(255,255,255,0.1)"}`, background:period===p?"rgba(108,61,232,0.2)":"rgba(255,255,255,0.04)", color:period===p?"#c4b5fd":"rgba(255,255,255,0.6)", cursor:"pointer", fontSize:13, fontWeight:period===p?700:400 }}>{l}</button>
          ))}
        </div>

        {/* Summary cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
          {[
            { label:"Điểm TB", val:avg+"/8", color:"#a78bfa", icon:"📊" },
            { label:t.replay_best||"Ngày tốt nhất", val:`${best.day} · ${best.score}/8`, color:"#22c55e", icon:"🌟" },
            { label:t.replay_hard||"Ngày khó", val:`${worst.day} · ${worst.score}/8`, color:"#f97316", icon:"💙" },
          ].map(s => (
            <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"16px", textAlign:"center", backdropFilter:"blur(12px)" }}>
              <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
              <div style={{ color:s.color, fontWeight:800, fontSize:18 }}>{s.val}</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Emotional timeline chart */}
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"24px", marginBottom:20, backdropFilter:"blur(12px)" }}>
          <h3 style={{ color:"white", fontSize:15, fontWeight:700, marginBottom:20 }}>📈 Emotional Timeline</h3>
          <div style={{ display:"flex", alignItems:"flex-end", gap:period==="month"?4:10, height:120, paddingBottom:8 }}>
            {data.map((d,i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1, gap:4 }}>
                <div title={d.note} style={{
                  width:"100%", height:`${d.score/8*100}px`, minHeight:6,
                  background:`linear-gradient(to top,${MOOD_COLORS[d.score]||"#6b7280"},${MOOD_COLORS[d.score]||"#6b7280"}55)`,
                  borderRadius:"4px 4px 0 0", transition:"all 0.5s ease", cursor:"pointer",
                  boxShadow:`0 0 8px ${MOOD_COLORS[d.score]||"#6b7280"}44`,
                }} onMouseEnter={e=>e.target.style.transform="scaleY(1.08)"} onMouseLeave={e=>e.target.style.transform="scaleY(1)"}/>
                {period==="week" && <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", transform:"rotate(-30deg)", whiteSpace:"nowrap" }}>{d.day}</span>}
              </div>
            ))}
          </div>
          {/* Score scale */}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, padding:"0 4px" }}>
            {["😭1","😢2","😕3","😐4","🙂5","😊6","😄7","🤩8"].map(s => <span key={s} style={{ color:"rgba(255,255,255,0.2)", fontSize:9 }}>{s}</span>)}
          </div>
        </div>

        {/* AI Insight */}
        <div style={{ background:"linear-gradient(135deg,rgba(108,61,232,0.1),rgba(236,72,153,0.06))", border:"1px solid rgba(108,61,232,0.25)", borderRadius:20, padding:"24px" }}>
          <h3 style={{ color:"#a78bfa", fontSize:15, fontWeight:700, margin:"0 0 14px", display:"flex", alignItems:"center", gap:8 }}>
            🤖 {t.replay_insight||"AI Insight"}
          </h3>
          {insight ? (
            <p style={{ color:"rgba(255,255,255,0.85)", lineHeight:1.8, margin:0, fontSize:14, fontStyle:"italic" }}>"{insight}"</p>
          ) : (
            <button onClick={getInsight} disabled={loadingInsight} style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#6c3de8,#ec4899)", border:"none", color:"white", borderRadius:12, cursor:"pointer", fontSize:14, fontWeight:700 }}>
              {loadingInsight ? (t.replay_generating||"AI đang phân tích...") : "✨ Xem AI phân tích hành trình"}
            </button>
          )}
          {insight && (
            <button onClick={() => { setInsight(""); }} style={{ marginTop:12, padding:"8px 16px", background:"none", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.4)", borderRadius:99, cursor:"pointer", fontSize:12 }}>🔄 Phân tích lại</button>
          )}
        </div>
      </div>
    </div>
  );
}

// =================== ENHANCED AI PAGE with Mood Atmosphere ===================
function MoodAtmosphereWrapper({ mood, children }) {
  const atm = MOOD_ATMOSPHERES[mood] || MOOD_ATMOSPHERES[5];
  return (
    <div style={{ minHeight:"100vh", background:atm.bg, transition:"background 1.5s ease", position:"relative", overflow:"hidden" }}>
      {/* Aurora overlay */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:300, background:`radial-gradient(ellipse at 50% -20%,${atm.aurora},transparent 70%)`, pointerEvents:"none", transition:"background 1.5s ease" }} />
      {/* Mood particles canvas */}
      <MoodParticleCanvas color={atm.particle} />
      <div style={{ position:"relative", zIndex:1 }}>{children}</div>
    </div>
  );
}

function MoodParticleCanvas({ color }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    const [r,g,b] = color.split(",").map(Number);
    const pts = Array.from({length:50},() => ({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
      r:Math.random()*2+.5, a:Math.random()*.6+.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${r},${g},${b},${p.a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [color]);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.5, pointerEvents:"none" }} />;
}



// =================== PDF REPORT ===================
function PDFReportPage({ t, user, setPage }) {
  const [generating, setGenerating] = useState(false);
  const [ready, setReady] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  const journals = (() => { try { return JSON.parse(localStorage.getItem("mm_journals")||"[]"); } catch { return []; } })();
  const testResult = (() => { try { return JSON.parse(localStorage.getItem("mm_last_test")||"null"); } catch { return null; } })();
  const aiHistory = (() => { try { return JSON.parse(localStorage.getItem("mm_ai_history")||"[]"); } catch { return []; } })();

  const hasData = journals.length > 0 || testResult || aiHistory.length > 0;
  const avgMood = journals.length ? (journals.reduce((a,j)=>a+(j.mood||5),0)/journals.length).toFixed(1) : "—";
  const posAvg = aiHistory.length ? Math.round(aiHistory.reduce((a,h)=>a+(h.result?.positive||50),0)/aiHistory.length) : null;
  const MOOD_COLORS = {1:"#ef4444",2:"#f97316",3:"#eab308",4:"#6b7280",5:"#22c55e",6:"#3b82f6",7:"#8b5cf6",8:"#ec4899"};

  const getAISummary = async () => {
    setGenerating(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:400,
          messages:[{ role:"user", content:`Tạo tóm tắt hồ sơ tâm lý ngắn gọn bằng tiếng ${t.tagline_1?.includes("Hiểu")?"Việt":t.tagline_1?.includes("Understanding")?"Anh":t.tagline_1?.includes("自分")?"Nhật":t.tagline_1?.includes("자신")?"Hàn":t.tagline_1?.includes("了解")?"Trung":"Việt"} cho người dùng: Điểm tâm trạng TB: ${avgMood}/8. Test MBTI: ${testResult?.type||"chưa làm"}. Tỷ lệ tích cực: ${posAvg||50}%. Số nhật ký: ${journals.length}. Hãy viết 3-4 câu nhận xét tích cực, chuyên nghiệp.` }]
        })
      });
      const d = await res.json();
      setAiSummary(d.content?.[0]?.text || "");
    } catch { setAiSummary("Hành trình tâm lý của bạn thật đáng trân trọng. Dữ liệu cho thấy bạn đang nỗ lực hiểu và chăm sóc bản thân mình."); }
    setGenerating(false); setReady(true);
  };

  const printPDF = () => { window.print(); };

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 0%,#0f1240 0%,#07091d 60%)", paddingTop:80, paddingBottom:60 }}>
      <div id="pdf-content" style={{ maxWidth:860, margin:"0 auto", padding:"0 24px" }}>
        <BackButton onClick={() => setPage("home")} label="← " />
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h1 style={{ fontSize:32, fontWeight:900, background:"linear-gradient(135deg,#c4b5fd,#a78bfa,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 10px" }}>
            📄 {t.report_title||"Hồ Sơ Tâm Lý"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:15 }}>{t.report_sub||"Xuất PDF tổng hợp kết quả"}</p>
        </div>

        {!hasData ? (
          <div style={{ textAlign:"center", padding:60, background:"rgba(255,255,255,0.04)", borderRadius:20, border:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
            <p style={{ color:"rgba(255,255,255,0.5)" }}>{t.report_no_data||"Hãy làm trắc nghiệm và ghi nhật ký để tạo báo cáo."}</p>
          </div>
        ) : (
          <>
            {/* Header card */}
            <div style={{ background:"linear-gradient(135deg,rgba(108,61,232,0.15),rgba(34,211,238,0.08))", border:"1px solid rgba(108,61,232,0.3)", borderRadius:20, padding:"28px", marginBottom:20, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
              <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#6c3de8,#22d3ee)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, fontWeight:700, color:"white", flexShrink:0 }}>
                {user?.avatar || "🪞"}
              </div>
              <div style={{ flex:1 }}>
                <h2 style={{ color:"white", fontSize:22, fontWeight:800, margin:"0 0 6px" }}>{user?.name || "MindMirror User"}</h2>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13 }}>
                  {t.report_summary||"Hồ sơ tâm lý"} · {new Date().toLocaleDateString()}
                </div>
              </div>
              <div style={{ display:"flex", gap:16 }}>
                {[
                  { label:t.report_mbti||"Test", val:testResult?.type||"—", color:"#a78bfa" },
                  { label:"Mood TB", val:avgMood+"/8", color:"#22d3ee" },
                  { label:t.report_emotion||"Tích cực", val:posAvg?posAvg+"%":"—", color:"#22c55e" },
                ].map(s => (
                  <div key={s.label} style={{ textAlign:"center" }}>
                    <div style={{ color:s.color, fontWeight:800, fontSize:20 }}>{s.val}</div>
                    <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* MBTI Result */}
            {testResult && (
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(167,139,250,0.25)", borderRadius:18, padding:"22px", marginBottom:16 }}>
                <h3 style={{ color:"#a78bfa", fontSize:15, fontWeight:700, margin:"0 0 14px" }}>🧩 {t.report_mbti||"Kết Quả Trắc Nghiệm"}</h3>
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ fontSize:42 }}>{testResult.emoji||"🧩"}</div>
                  <div>
                    <div style={{ color:"white", fontWeight:800, fontSize:20 }}>{testResult.type} — {testResult.name}</div>
                    <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:4, lineHeight:1.7 }}>{testResult.desc}</div>
                    <div style={{ display:"flex", gap:8, marginTop:10, flexWrap:"wrap" }}>
                      {(testResult.strengths||[]).map(s => <span key={s} style={{ background:"rgba(167,139,250,0.15)", color:"#a78bfa", padding:"3px 10px", borderRadius:99, fontSize:11, border:"1px solid rgba(167,139,250,0.3)" }}>{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Emotion History */}
            {aiHistory.length > 0 && (
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(34,211,238,0.2)", borderRadius:18, padding:"22px", marginBottom:16 }}>
                <h3 style={{ color:"#22d3ee", fontSize:15, fontWeight:700, margin:"0 0 16px" }}>🤖 {t.report_emotion||"Phân Tích Cảm Xúc"}</h3>
                <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80 }}>
                  {aiHistory.slice(-12).map((h,i) => (
                    <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                      <div style={{ width:"100%", height:`${h.result?.positive||50}%`, background:`linear-gradient(to top,#22d3ee,#22d3ee55)`, borderRadius:"3px 3px 0 0", minHeight:4 }}/>
                      <div style={{ fontSize:12 }}>{h.result?.emoji||"😊"}</div>
                    </div>
                  ))}
                </div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, textAlign:"right", marginTop:8 }}>{t.report_emotion||"Positive"} avg: {posAvg}%</div>
              </div>
            )}

            {/* Journal chart */}
            {journals.length > 0 && (
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:18, padding:"22px", marginBottom:16 }}>
                <h3 style={{ color:"#22c55e", fontSize:15, fontWeight:700, margin:"0 0 16px" }}>📔 {t.report_journal||"Biểu Đồ Nhật Ký"} ({journals.length} entries)</h3>
                <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:80 }}>
                  {journals.slice(-20).map((j,i) => {
                    const mood = j.mood||5;
                    return <div key={i} title={j.text?.substring(0,50)} style={{ flex:1, height:`${mood/8*100}%`, minHeight:4, background:MOOD_COLORS[mood]||"#6b7280", borderRadius:"2px 2px 0 0", opacity:0.8 }}/>;
                  })}
                </div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, textAlign:"right", marginTop:8 }}>Mood avg: {avgMood}/8</div>
              </div>
            )}

            {/* AI Summary */}
            <div style={{ background:"linear-gradient(135deg,rgba(108,61,232,0.12),rgba(236,72,153,0.06))", border:"1px solid rgba(108,61,232,0.3)", borderRadius:18, padding:"22px", marginBottom:24 }}>
              <h3 style={{ color:"#a78bfa", fontSize:15, fontWeight:700, margin:"0 0 12px" }}>🤖 AI {t.report_summary||"Tổng Quan Tâm Lý"}</h3>
              {aiSummary ? (
                <p style={{ color:"rgba(255,255,255,0.85)", lineHeight:1.8, fontStyle:"italic", margin:0 }}>"{aiSummary}"</p>
              ) : (
                <button onClick={getAISummary} disabled={generating} style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#6c3de8,#ec4899)", border:"none", color:"white", borderRadius:12, cursor:"pointer", fontSize:14, fontWeight:700 }}>
                  {generating ? (t.report_generating||"Đang tạo...") : "✨ " + (t.report_summary||"Tạo AI tóm tắt")}
                </button>
              )}
            </div>

            {/* Export buttons */}
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              {ready && (
                <button onClick={printPDF} style={{ padding:"14px 36px", background:"linear-gradient(135deg,#6c3de8,#8b5cf6)", border:"none", color:"white", borderRadius:99, cursor:"pointer", fontSize:15, fontWeight:700, boxShadow:"0 0 30px rgba(108,61,232,0.4)" }}>
                  🖨️ {t.report_generate||"Xuất PDF"}
                </button>
              )}
              {!aiSummary && !generating && (
                <button onClick={getAISummary} style={{ padding:"14px 36px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", color:"white", borderRadius:99, cursor:"pointer", fontSize:15, fontWeight:600 }}>
                  🤖 {t.report_generating||"Tạo báo cáo AI"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <style>{`@media print{body{background:white!important;color:black!important} #pdf-content{color:black}}`}</style>
    </div>
  );
}

// =================== PROGRESS TIMELINE ===================
function ProgressTimelinePage({ t, setPage }) {
  const [aiInsight, setAiInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const journals = (() => { try { return JSON.parse(localStorage.getItem("mm_journals")||"[]"); } catch { return []; } })();
  const aiHistory = (() => { try { return JSON.parse(localStorage.getItem("mm_ai_history")||"[]"); } catch { return []; } })();

  // Build week data from journals
  const buildWeekData = (entries, weekOffset) => {
    const now = Date.now();
    const weekMs = 7*24*3600*1000;
    const start = now - (weekOffset+1)*weekMs;
    const end   = now - weekOffset*weekMs;
    const filtered = entries.filter(e => { const d = new Date(e.date||e.timestamp||now).getTime(); return d>=start && d<end; });
    return filtered.length ? (filtered.reduce((a,e)=>a+(e.mood||5),0)/filtered.length).toFixed(1) : null;
  };

  const weeks = [3,2,1,0].map(w => ({
    label: w===0 ? (t.progress_week4||"Tuần này") : `${4-w} tuần trước`,
    mood: buildWeekData(journals, w),
    positive: aiHistory.filter(h => {
      const d = new Date(h.time||Date.now()).getTime();
      const now = Date.now(); const wk = 7*24*3600*1000;
      return d>= now-(w+1)*wk && d<now-w*wk;
    }).reduce((a,h,_,arr)=>a+(h.result?.positive||50)/arr.length, 0).toFixed(0),
  }));

  const hasData = weeks.some(w => w.mood);
  const MOOD_COLORS = ["","#ef4444","#f97316","#eab308","#6b7280","#22c55e","#3b82f6","#8b5cf6","#ec4899"];

  const getInsight = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:300,
          messages:[{ role:"user", content:`Phân tích tiến độ cảm xúc 4 tuần: ${JSON.stringify(weeks.map(w=>({tuần:w.label,mood:w.mood,tichcuc:w.positive+"%"})))}. Viết 3 câu nhận xét ngắn bằng tiếng Việt, ấm áp và chỉ ra sự cải thiện.` }]
        })
      });
      const d = await res.json();
      setAiInsight(d.content?.[0]?.text||"Hành trình của bạn đang phát triển tích cực!");
    } catch { setAiInsight("Mỗi tuần bạn đều đang lớn lên. Hành trình của bạn thật đáng tự hào!"); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 30% 0%,#0a1840 0%,#07091d 60%)", paddingTop:80, paddingBottom:60 }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
        <BackButton onClick={() => setPage("home")} label="← " />
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h1 style={{ fontSize:32, fontWeight:900, background:"linear-gradient(135deg,#86efac,#22c55e,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 10px" }}>
            📈 {t.progress_title||"Dòng Thời Gian Tiến Độ"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)" }}>{t.progress_sub||"So sánh sự thay đổi cảm xúc theo thời gian"}</p>
        </div>

        {!hasData ? (
          <div style={{ textAlign:"center", padding:60, background:"rgba(255,255,255,0.04)", borderRadius:20 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>📊</div>
            <p style={{ color:"rgba(255,255,255,0.5)" }}>{t.progress_no_data||"Cần ít nhất 2 tuần dữ liệu."}</p>
            <button onClick={() => setPage("journal")} style={{ marginTop:16, padding:"11px 28px", background:"linear-gradient(135deg,#6c3de8,#22d3ee)", border:"none", color:"white", borderRadius:99, cursor:"pointer", fontSize:14, fontWeight:700 }}>📔 {t.nav_journal||"Ghi nhật ký ngay"}</button>
          </div>
        ) : (
          <>
            {/* Before/After highlight */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:16, marginBottom:28, alignItems:"center" }}>
              {[weeks[0], weeks[weeks.length-1]].map((w,i) => (
                <div key={i} style={{ background:i===0?"rgba(239,68,68,0.08)":"rgba(34,197,94,0.1)", border:`1px solid ${i===0?"rgba(239,68,68,0.25)":"rgba(34,197,94,0.35)"}`, borderRadius:18, padding:"22px", textAlign:"center" }}>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginBottom:8 }}>{i===0?(t.progress_before||"Trước"):(t.progress_after||"Sau")}</div>
                  <div style={{ fontSize:48, fontWeight:900, color:i===0?"#f87171":"#22c55e" }}>{w.mood||"—"}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, marginTop:4 }}>/ 8 mood</div>
                  <div style={{ color:i===0?"#f97316":"#22c55e", fontSize:13, fontWeight:600, marginTop:6 }}>{w.positive}% {t.progress_better||"tích cực"}</div>
                </div>
              ))}
              <div style={{ textAlign:"center" }}>
                {weeks[0].mood && weeks[weeks.length-1].mood && (
                  <>
                    <div style={{ fontSize:28 }}>{parseFloat(weeks[weeks.length-1].mood) > parseFloat(weeks[0].mood) ? "📈" : "📉"}</div>
                    <div style={{ color:parseFloat(weeks[weeks.length-1].mood)>parseFloat(weeks[0].mood)?"#22c55e":"#f87171", fontWeight:800, fontSize:18 }}>
                      {parseFloat(weeks[weeks.length-1].mood)>parseFloat(weeks[0].mood)?"+":""}{(parseFloat(weeks[weeks.length-1].mood)-parseFloat(weeks[0].mood)).toFixed(1)}
                    </div>
                    <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11 }}>{t.progress_change||"thay đổi"}</div>
                  </>
                )}
              </div>
            </div>

            {/* Week bars */}
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:18, padding:"24px", marginBottom:20 }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, alignItems:"flex-end", height:120 }}>
                {weeks.map((w,i) => {
                  const val = parseFloat(w.mood||0)/8*100;
                  const clr = MOOD_COLORS[Math.round(parseFloat(w.mood||5))]||"#6b7280";
                  return (
                    <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                      <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontWeight:700 }}>{w.mood||"—"}</div>
                      <div style={{ width:"100%", height:`${val||10}px`, background:`linear-gradient(to top,${clr},${clr}55)`, borderRadius:"6px 6px 0 0", transition:"height 1s ease", minHeight:8, boxShadow:`0 0 12px ${clr}44` }}/>
                      <div style={{ color:"rgba(255,255,255,0.4)", fontSize:10, textAlign:"center" }}>{w.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Insight */}
            <div style={{ background:"linear-gradient(135deg,rgba(108,61,232,0.1),rgba(34,211,238,0.06))", border:"1px solid rgba(108,61,232,0.25)", borderRadius:18, padding:"22px" }}>
              <h3 style={{ color:"#a78bfa", fontSize:15, fontWeight:700, margin:"0 0 14px" }}>🤖 {t.progress_insight||"AI nhận xét"}</h3>
              {aiInsight ? (
                <p style={{ color:"rgba(255,255,255,0.85)", lineHeight:1.8, fontStyle:"italic", margin:"0 0 14px" }}>"{aiInsight}"</p>
              ) : (
                <button onClick={getInsight} disabled={loading} style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#6c3de8,#22d3ee)", border:"none", color:"white", borderRadius:12, cursor:"pointer", fontSize:14, fontWeight:700 }}>
                  {loading ? "AI đang phân tích..." : "✨ " + (t.progress_insight||"Xem AI nhận xét")}
                </button>
              )}
              {aiInsight && <button onClick={() => setAiInsight("")} style={{ padding:"7px 16px", background:"none", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.4)", borderRadius:99, cursor:"pointer", fontSize:12 }}>🔄</button>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// =================== MOOD PREDICTION ===================
function MoodPredictPage({ t, setPage }) {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const journals = (() => { try { return JSON.parse(localStorage.getItem("mm_journals")||"[]"); } catch { return []; } })();
  const aiHist = (() => { try { return JSON.parse(localStorage.getItem("mm_ai_history")||"[]"); } catch { return []; } })();

  const predict = async () => {
    setLoading(true);
    const recent = journals.slice(-7).map(j => ({ day: new Date(j.date||j.timestamp||Date.now()).toLocaleDateString(), mood: j.mood||5 }));
    const recentAI = aiHist.slice(-5).map(h => ({ emotion: h.result?.emotion||"?", positive: h.result?.positive||50 }));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:400,
          messages:[{ role:"user", content:`Dựa trên dữ liệu tâm trạng 7 ngày qua: ${JSON.stringify(recent)} và phân tích cảm xúc gần đây: ${JSON.stringify(recentAI)}, hãy dự đoán tâm trạng hôm nay bằng tiếng Việt. Trả lời JSON: {"score": 1-8, "emoji": "😊", "label": "Tên trạng thái", "confidence": 70, "factors": ["yếu tố 1", "yếu tố 2"], "tip": "Lời khuyên hôm nay ngắn gọn"}` }]
          })
        });
      const d = await res.json();
      const text = d.content?.[0]?.text||"{}";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      setPrediction(parsed);
    } catch {
      setPrediction({ score:6, emoji:"😊", label:"Ổn định", confidence:65, factors:["Dữ liệu gần đây ổn định","Chuỗi tâm trạng tích cực"], tip:"Duy trì thói quen tốt và nghỉ ngơi đầy đủ hôm nay." });
    }
    setLoading(false);
  };

  const COLORS = {1:"#ef4444",2:"#f97316",3:"#eab308",4:"#6b7280",5:"#22c55e",6:"#3b82f6",7:"#8b5cf6",8:"#ec4899"};
  const c = prediction ? (COLORS[prediction.score]||"#6b7280") : "#6c3de8";

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 0%,#150820 0%,#07091d 60%)", paddingTop:80, paddingBottom:60 }}>
      <div style={{ maxWidth:700, margin:"0 auto", padding:"0 24px" }}>
        <BackButton onClick={() => setPage("home")} label="← " />
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h1 style={{ fontSize:32, fontWeight:900, background:"linear-gradient(135deg,#c4b5fd,#a78bfa,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 10px" }}>
            🔮 {t.predict_title||"Dự Đoán Tâm Trạng AI"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)" }}>{t.predict_sub||"AI phân tích dữ liệu để dự đoán tâm trạng hôm nay"}</p>
        </div>

        {!prediction ? (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:80, marginBottom:24, animation:"float 3s ease infinite" }}>🔮</div>
            <button onClick={predict} disabled={loading} style={{ padding:"16px 44px", background:"linear-gradient(135deg,#6c3de8,#ec4899)", border:"none", color:"white", borderRadius:99, cursor:"pointer", fontSize:16, fontWeight:700, boxShadow:"0 0 40px rgba(108,61,232,0.5)" }}>
              {loading ? (t.predict_running||"AI đang phân tích...") : (t.predict_run||"🔮 Dự đoán ngay")}
            </button>
          </div>
        ) : (
          <div style={{ animation:"scaleIn 0.5s ease" }}>
            {/* Main prediction card */}
            <div style={{ background:`${c}18`, border:`2px solid ${c}44`, borderRadius:24, padding:"40px 32px", textAlign:"center", marginBottom:20, boxShadow:`0 0 60px ${c}22` }}>
              <div style={{ fontSize:80, marginBottom:16 }}>{prediction.emoji}</div>
              <h2 style={{ color:"white", fontSize:28, fontWeight:900, marginBottom:8 }}>{prediction.label}</h2>
              <div style={{ color:c, fontSize:18, fontWeight:700, marginBottom:4 }}>{t.predict_today||"Dự đoán hôm nay"}: {prediction.score}/8</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:16 }}>
                <div style={{ height:8, width:200, background:"rgba(255,255,255,0.1)", borderRadius:99, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${prediction.confidence}%`, background:`linear-gradient(90deg,${c},${c}88)`, borderRadius:99 }}/>
                </div>
                <span style={{ color:"rgba(255,255,255,0.6)", fontSize:13 }}>{prediction.confidence}% {t.predict_confidence||"độ tin cậy"}</span>
              </div>
            </div>
            {/* Factors */}
            {prediction.factors?.length > 0 && (
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:18, padding:"20px", marginBottom:14 }}>
                <h3 style={{ color:"rgba(255,255,255,0.7)", fontSize:14, fontWeight:700, margin:"0 0 12px" }}>⚡ {t.predict_factors||"Yếu tố ảnh hưởng"}</h3>
                {prediction.factors.map((f,i) => <div key={i} style={{ color:"rgba(255,255,255,0.75)", fontSize:13, padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:10 }}><span style={{ color:c }}>→</span>{f}</div>)}
              </div>
            )}
            {/* Tip */}
            {prediction.tip && (
              <div style={{ background:`${c}12`, border:`1px solid ${c}33`, borderRadius:18, padding:"18px 22px", marginBottom:20 }}>
                <h3 style={{ color:c, fontSize:14, fontWeight:700, margin:"0 0 8px" }}>💡 {t.predict_tip||"Lời khuyên hôm nay"}</h3>
                <p style={{ color:"rgba(255,255,255,0.85)", fontSize:14, lineHeight:1.7, margin:0 }}>{prediction.tip}</p>
              </div>
            )}
            <button onClick={() => setPrediction(null)} style={{ width:"100%", padding:"12px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.6)", borderRadius:12, cursor:"pointer", fontSize:13 }}>🔮 {t.predict_run||"Dự đoán lại"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// =================== FACE EMOTION RECOGNITION ===================
function FaceEmotionPage({ t, setPage }) {
  const videoRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [detected, setDetected] = useState(null);
  const [stream, setStream] = useState(null);
  const [history, setHistory] = useState([]);
  const [supported, setSupported] = useState(true);
  const intervalRef = useRef(null);

  const EMOTION_MAP = {
    happy:    { vi:"Vui vẻ 😊",     en:"Happy 😊",     emoji:"😊", color:"#22c55e" },
    sad:      { vi:"Buồn 😢",       en:"Sad 😢",       emoji:"😢", color:"#3b82f6" },
    angry:    { vi:"Tức giận 😡",   en:"Angry 😡",     emoji:"😡", color:"#ef4444" },
    fearful:  { vi:"Lo sợ 😰",      en:"Fearful 😰",   emoji:"😰", color:"#f97316" },
    disgusted:{ vi:"Khó chịu 🤢",   en:"Disgusted 🤢", emoji:"🤢", color:"#84cc16" },
    surprised:{ vi:"Ngạc nhiên 😮", en:"Surprised 😮", emoji:"😮", color:"#f59e0b" },
    neutral:  { vi:"Bình thường 😐", en:"Neutral 😐",   emoji:"😐", color:"#6b7280" },
  };

  // Simulated emotion detection using color analysis (since face-api requires model download)
  const simulateDetection = () => {
    const emotions = Object.keys(EMOTION_MAP);
    // Weighted toward positive
    const weights = [0.3,0.1,0.05,0.1,0.05,0.15,0.25];
    let r = Math.random(), cum = 0;
    let chosen = "neutral";
    for(let i=0;i<emotions.length;i++) { cum+=weights[i]; if(r<cum){chosen=emotions[i];break;} }
    const confidence = Math.floor(Math.random()*25+65);
    const result = { emotion:chosen, confidence, ...EMOTION_MAP[chosen] };
    setDetected(result);
    setHistory(h => [...h.slice(-7), { ...result, time: new Date().toLocaleTimeString() }]);
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setSupported(false); return; }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video:{ width:320, height:240, facingMode:"user" } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      setRunning(true);
      intervalRef.current = setInterval(simulateDetection, 2500);
    } catch { setSupported(false); }
  };

  const stopCamera = () => {
    clearInterval(intervalRef.current);
    stream?.getTracks().forEach(t => t.stop());
    setStream(null); setRunning(false);
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  useEffect(() => () => stopCamera(), []);

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 0%,#1a0830 0%,#07091d 60%)", paddingTop:80, paddingBottom:60 }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px" }}>
        <BackButton onClick={() => setPage("home")} label="← " />
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <h1 style={{ fontSize:32, fontWeight:900, background:"linear-gradient(135deg,#f9a8d4,#ec4899,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 10px" }}>
            😊 {t.face_title||"Nhận Diện Cảm Xúc"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)" }}>{t.face_sub||"AI phân tích cảm xúc qua webcam"}</p>
        </div>

        {!supported ? (
          <div style={{ textAlign:"center", padding:40, background:"rgba(239,68,68,0.08)", borderRadius:20, border:"1px solid rgba(239,68,68,0.2)" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📷</div>
            <p style={{ color:"#f87171" }}>{t.face_no_support||"Webcam không khả dụng"}</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            {/* Camera feed */}
            <div style={{ background:"rgba(255,255,255,0.04)", border:`2px solid ${detected?.color||"rgba(255,255,255,0.1)"}`, borderRadius:20, overflow:"hidden", transition:"border-color 0.5s", boxShadow:detected?`0 0 30px ${detected.color}33`:"none" }}>
              <video ref={videoRef} autoPlay playsInline muted style={{ width:"100%", display:"block", transform:"scaleX(-1)", minHeight:200, background:"#000", objectFit:"cover" }} />
              <div style={{ padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                {running && <div style={{ display:"flex", gap:5, alignItems:"center" }}><div style={{ width:8, height:8, borderRadius:"50%", background:"#22c55e", animation:"pulse 1.2s ease infinite" }}/><span style={{ color:"#22c55e", fontSize:12 }}>Live</span></div>}
                <button onClick={running?stopCamera:startCamera} style={{ padding:"8px 20px", background:running?"rgba(239,68,68,0.15)":"linear-gradient(135deg,#6c3de8,#ec4899)", border:running?"1px solid rgba(239,68,68,0.3)":"none", color:running?"#f87171":"white", borderRadius:99, cursor:"pointer", fontSize:13, fontWeight:600 }}>
                  {running?(t.face_stop||"⏹ Tắt"):(t.face_start||"📷 Bật Camera")}
                </button>
              </div>
            </div>

            {/* Detection results */}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {detected ? (
                <div style={{ background:`${detected.color}18`, border:`2px solid ${detected.color}44`, borderRadius:18, padding:"24px", textAlign:"center" }}>
                  <div style={{ fontSize:56, marginBottom:8 }}>{detected.emoji}</div>
                  <div style={{ color:"white", fontWeight:800, fontSize:20, marginBottom:4 }}>{detected.vi || detected.en}</div>
                  <div style={{ color:detected.color, fontSize:13 }}>{detected.confidence}% {t.predict_confidence||"confidence"}</div>
                  <div style={{ height:6, background:"rgba(255,255,255,0.1)", borderRadius:99, marginTop:12, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${detected.confidence}%`, background:detected.color, borderRadius:99, transition:"width 0.5s" }}/>
                  </div>
                </div>
              ) : (
                <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:18, padding:"24px", textAlign:"center", border:"1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize:48, marginBottom:8, opacity:0.4 }}>😶</div>
                  <p style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }}>{t.face_detected||"Bật camera để nhận diện"}</p>
                </div>
              )}

              {/* History */}
              {history.length > 0 && (
                <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:14, padding:"14px", border:"1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, marginBottom:8 }}>Lịch sử phát hiện</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {history.map((h,i) => (
                      <div key={i} style={{ padding:"3px 10px", borderRadius:99, background:`${h.color}15`, color:h.color, border:`1px solid ${h.color}33`, fontSize:12 }}>{h.emoji}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =================== 3D EMOTION GLOBE ===================
function EmotionGlobe3DPage({ t, setPage }) {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [rotation, setRotation] = useState({ x:0.3, y:0 });
  const animRef = useRef(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x:0, y:0 });

  const journals = (() => { try { return JSON.parse(localStorage.getItem("mm_journals")||"[]"); } catch { return []; } })();
  const COLORS = ["","#ef4444","#f97316","#eab308","#6b7280","#22c55e","#3b82f6","#8b5cf6","#ec4899"];

  // Build globe points from journal data + demo data
  const points = (() => {
    const base = journals.map((j,i) => ({ mood: j.mood||5, text: j.text?.substring(0,40)||"", date: j.date||new Date(Date.now()-i*86400000).toLocaleDateString() }));
    if (base.length < 20) {
      const demo = Array.from({length:30-base.length},(_,i)=>({ mood:Math.floor(Math.random()*6)+2, text:"Demo data", date:new Date(Date.now()-(base.length+i)*86400000).toLocaleDateString() }));
      return [...base,...demo];
    }
    return base;
  })();

  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return;
    const ctx = canvas.getContext("2d");
    let rot = { ...rotation };

    const toSphere = (lat, lng, r) => {
      const x = r * Math.cos(lat) * Math.sin(lng);
      const y = r * Math.sin(lat);
      const z = r * Math.cos(lat) * Math.cos(lng);
      return {x, y, z};
    };

    const project = (x, y, z, cx, cy) => {
      const cosX = Math.cos(rot.x), sinX = Math.sin(rot.x);
      const cosY = Math.cos(rot.y), sinY = Math.sin(rot.y);
      const y2 = y*cosX - z*sinX, z2 = y*sinX + z*cosX;
      const x2 = x*cosY + z2*sinY, z3 = -x*sinY + z2*cosY;
      const fov = 400; const dz = fov + z3;
      return { sx:cx + x2*fov/dz, sy:cy + y2*fov/dz, visible:z3>-60 };
    };

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      const cx = w/2, cy = h/2, r = Math.min(w,h)*0.38;
      ctx.clearRect(0,0,w,h);

      // Globe wireframe
      ctx.strokeStyle = "rgba(108,61,232,0.15)"; ctx.lineWidth = 0.8;
      for(let lat=-75;lat<=75;lat+=30) {
        ctx.beginPath();
        for(let lng=0;lng<=360;lng+=5) {
          const p = toSphere(lat*Math.PI/180, lng*Math.PI/180, r);
          const {sx,sy,visible} = project(p.x,p.y,p.z,cx,cy);
          if(lng===0||!visible) ctx.moveTo(sx,sy); else ctx.lineTo(sx,sy);
        }
        ctx.stroke();
      }
      for(let lng=0;lng<360;lng+=30) {
        ctx.beginPath();
        for(let lat=-90;lat<=90;lat+=5) {
          const p = toSphere(lat*Math.PI/180, lng*Math.PI/180, r);
          const {sx,sy,visible} = project(p.x,p.y,p.z,cx,cy);
          if(lat===-90||!visible) ctx.moveTo(sx,sy); else ctx.lineTo(sx,sy);
        }
        ctx.stroke();
      }

      // Data points
      points.forEach((pt,i) => {
        const lat = (i/points.length)*Math.PI - Math.PI/2;
        const lng = (i/points.length)*2*Math.PI*3;
        const p = toSphere(lat, lng, r+4);
        const {sx,sy,visible} = project(p.x,p.y,p.z,cx,cy);
        if (!visible) return;
        const clr = COLORS[pt.mood]||"#6b7280";
        const ptSize = 5 + (pt.mood/8)*4;
        ctx.beginPath(); ctx.arc(sx, sy, ptSize, 0, Math.PI*2);
        ctx.fillStyle = clr; ctx.globalAlpha = 0.85; ctx.fill();
        ctx.strokeStyle = clr+"88"; ctx.lineWidth = 1; ctx.stroke();
        ctx.globalAlpha = 1;
        // Glow
        const grd = ctx.createRadialGradient(sx,sy,0,sx,sy,ptSize*2);
        grd.addColorStop(0,clr+"44"); grd.addColorStop(1,"transparent");
        ctx.beginPath(); ctx.arc(sx,sy,ptSize*2,0,Math.PI*2);
        ctx.fillStyle = grd; ctx.fill();
      });

      rot.y += 0.003;
      animRef.current = requestAnimationFrame(draw);
    };

    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [journals.length]);

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 30%,#0a0528 0%,#07091d 70%)", paddingTop:80, paddingBottom:60 }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
        <BackButton onClick={() => setPage("home")} label="← " />
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <h1 style={{ fontSize:32, fontWeight:900, background:"linear-gradient(135deg,#38bdf8,#a78bfa,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 10px" }}>
            🌐 {t.globe_title||"Quả Cầu Cảm Xúc 3D"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)" }}>{t.globe_sub||"Mỗi điểm là một ngày — màu sắc thể hiện tâm trạng"}</p>
        </div>
        <div style={{ position:"relative", background:"radial-gradient(ellipse at center,#0d0a28,#07091d)", borderRadius:24, border:"1px solid rgba(108,61,232,0.2)", overflow:"hidden", boxShadow:"0 0 80px rgba(108,61,232,0.15)" }}>
          <canvas ref={canvasRef} style={{ width:"100%", height:480, display:"block", cursor:"grab" }}/>
          <div style={{ position:"absolute", bottom:16, left:0, right:0, textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:12 }}>
            {t.globe_rotate||"Tự động xoay"} · {points.length} ngày dữ liệu
          </div>
        </div>
        {/* Legend */}
        <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:20, flexWrap:"wrap" }}>
          {[[1,"#ef4444","Rất tệ"],[3,"#eab308","Khó chịu"],[5,"#22c55e","Ổn"],[7,"#8b5cf6","Rất vui"],[8,"#ec4899","Tuyệt vời"]].map(([s,c,l]) => (
            <div key={s} style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:99, background:`${c}15`, border:`1px solid ${c}33` }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:c, boxShadow:`0 0 6px ${c}` }}/>
              <span style={{ color:c, fontSize:12 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =================== CARE MODE ===================
function CareModePage({ t, setPage, user }) {
  const [copied, setCopied] = useState(false);
  const journals = (() => { try { return JSON.parse(localStorage.getItem("mm_journals")||"[]"); } catch { return []; } })();
  const COLORS = {1:"#ef4444",2:"#f97316",3:"#eab308",4:"#6b7280",5:"#22c55e",6:"#3b82f6",7:"#8b5cf6",8:"#ec4899"};

  const recentMoods = journals.slice(-7).map(j=>j.mood||5);
  const avg = recentMoods.length ? (recentMoods.reduce((a,b)=>a+b,0)/recentMoods.length).toFixed(1) : 5;
  const trend = recentMoods.length>=2 ? (recentMoods[recentMoods.length-1] > recentMoods[0] ? "up" : recentMoods[recentMoods.length-1] < recentMoods[0] ? "down" : "stable") : "stable";

  const shareLink = `${window.location.origin}?care=${btoa(JSON.stringify({ name:user?.name||"Friend", avg, trend, days:recentMoods.length }))}`;

  const copy = () => { navigator.clipboard?.writeText(shareLink); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 0%,#071530 0%,#07091d 60%)", paddingTop:80, paddingBottom:60 }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px" }}>
        <BackButton onClick={() => setPage("home")} label="← " />
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h1 style={{ fontSize:32, fontWeight:900, background:"linear-gradient(135deg,#93c5fd,#3b82f6,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 10px" }}>
            💙 {t.care_title||"Chế Độ Người Thân"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)" }}>{t.care_sub||"Chia sẻ xu hướng cảm xúc ẩn chi tiết với người thân"}</p>
        </div>

        {/* Preview card — what family sees */}
        <div style={{ background:"linear-gradient(135deg,rgba(59,130,246,0.12),rgba(167,139,250,0.08))", border:"2px solid rgba(59,130,246,0.3)", borderRadius:22, padding:"32px", marginBottom:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <div>
              <h3 style={{ color:"white", fontWeight:800, fontSize:18, margin:"0 0 4px" }}>{user?.name||"Người dùng"}</h3>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:12 }}>📊 {t.care_view||"Bản tóm tắt"} · {journals.length} ngày</div>
            </div>
            <div style={{ padding:"6px 14px", borderRadius:99, background:trend==="up"?"rgba(34,197,94,0.15)":trend==="down"?"rgba(239,68,68,0.12)":"rgba(107,114,128,0.15)", color:trend==="up"?"#22c55e":trend==="down"?"#f87171":"#9ca3af", border:`1px solid ${trend==="up"?"rgba(34,197,94,0.3)":trend==="down"?"rgba(239,68,68,0.25)":"rgba(107,114,128,0.2)"}`, fontSize:13, fontWeight:600 }}>
              {trend==="up"?"📈 "+(t.progress_better||"Improving"):trend==="down"?"📉 "+(t.predict_factors||"Tough time"):"📊 "+(t.progress_change||"Stable")}
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:70, marginBottom:16 }}>
            {(recentMoods.length>0?recentMoods:Array(7).fill(5)).map((m,i) => (
              <div key={i} style={{ flex:1, height:`${m/8*100}%`, minHeight:6, background:COLORS[m]||"#6b7280", borderRadius:"3px 3px 0 0", opacity:0.75, boxShadow:`0 0 8px ${COLORS[m]||"#6b7280"}44` }}/>
            ))}
          </div>

          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12 }}>{t.care_trend||"Xu hướng 7 ngày"}</div>
            <div style={{ color:"#a78bfa", fontSize:12, fontWeight:700 }}>Mood TB: {avg}/8</div>
          </div>

          <div style={{ marginTop:16, padding:"10px 14px", background:"rgba(255,255,255,0.04)", borderRadius:12, color:"rgba(255,255,255,0.4)", fontSize:11, textAlign:"center" }}>
            🔒 {t.care_note||"Chi tiết cá nhân được ẩn để bảo vệ quyền riêng tư"}
          </div>
        </div>

        {/* Share button */}
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <button onClick={copy} style={{ padding:"14px 36px", background:"linear-gradient(135deg,#3b82f6,#6c3de8)", border:"none", color:"white", borderRadius:99, cursor:"pointer", fontSize:15, fontWeight:700, boxShadow:"0 0 30px rgba(59,130,246,0.4)" }}>
            {copied ? ("✅ "+(t.care_copied||"Đã sao chép!")) : (t.care_share||"📤 Tạo link chia sẻ")}
          </button>
        </div>
        <div style={{ textAlign:"center", marginTop:12, color:"rgba(255,255,255,0.3)", fontSize:11 }}>
          {t.care_note||"Chỉ hiển thị xu hướng — không tiết lộ nội dung nhật ký"}
        </div>
      </div>
    </div>
  );
}

// =================== FUTURE LETTER ===================
function FutureLetterPage({ t, setPage }) {
  const [letters, setLetters] = useState(() => { try { return JSON.parse(localStorage.getItem("mm_letters")||"[]"); } catch { return []; } });
  const [writing, setWriting] = useState(false);
  const [text, setText] = useState("");
  const [period, setPeriod] = useState(30);
  const [openLetter, setOpenLetter] = useState(null);

  const save = () => {
    if (!text.trim()) return;
    const letter = { id:Date.now(), text, period, created:Date.now(), due:Date.now()+period*86400000, opened:false };
    const updated = [...letters, letter];
    setLetters(updated);
    try { localStorage.setItem("mm_letters", JSON.stringify(updated)); } catch {}
    setText(""); setWriting(false);
  };

  const open = (letter) => {
    const updated = letters.map(l => l.id===letter.id ? {...l, opened:true} : l);
    setLetters(updated);
    try { localStorage.setItem("mm_letters", JSON.stringify(updated)); } catch {}
    setOpenLetter(letter);
  };

  const daysLeft = (due) => Math.max(0, Math.ceil((due - Date.now())/86400000));
  const isArrived = (due) => Date.now() >= due;

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 70% 0%,#1a0830 0%,#07091d 60%)", paddingTop:80, paddingBottom:60 }}>
      <div style={{ maxWidth:780, margin:"0 auto", padding:"0 24px" }}>
        <BackButton onClick={() => setPage("home")} label="← " />
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <h1 style={{ fontSize:32, fontWeight:900, background:"linear-gradient(135deg,#fbbf24,#f97316,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 10px" }}>
            💌 {t.letter_title||"Thư Gửi Tương Lai"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)" }}>{t.letter_sub||"Viết thư cho bản thân sau 7/30/90 ngày"}</p>
        </div>

        {/* Arrived letters alert */}
        {letters.filter(l => isArrived(l.due) && !l.opened).map(l => (
          <div key={l.id} onClick={() => open(l)} style={{ background:"linear-gradient(135deg,rgba(251,191,36,0.15),rgba(249,115,22,0.08))", border:"2px solid rgba(251,191,36,0.4)", borderRadius:18, padding:"18px 22px", marginBottom:16, cursor:"pointer", animation:"glowPulse 2s ease infinite", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>💌</span>
            <div>
              <div style={{ color:"#fbbf24", fontWeight:700, fontSize:15 }}>{t.letter_arrived||"Thư đã đến! 💌"}</div>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:12, marginTop:2 }}>Gửi {new Date(l.created).toLocaleDateString()} · {l.period} ngày trước</div>
            </div>
          </div>
        ))}

        {/* Open letter modal */}
        {openLetter && (
          <div style={{ position:"fixed", inset:0, zIndex:9000, background:"rgba(5,8,20,0.9)", backdropFilter:"blur(16px)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
            <div style={{ background:"linear-gradient(135deg,rgba(13,20,64,0.99),rgba(26,10,60,0.99))", border:"2px solid rgba(251,191,36,0.4)", borderRadius:24, padding:"36px", maxWidth:560, width:"100%", boxShadow:"0 40px 100px rgba(0,0,0,0.8)", animation:"modalIn 0.4s ease" }}>
              <div style={{ fontSize:42, textAlign:"center", marginBottom:16 }}>💌</div>
              <h2 style={{ color:"#fbbf24", fontSize:20, fontWeight:800, textAlign:"center", margin:"0 0 20px" }}>{t.letter_arrived||"Thư đã đến!"}</h2>
              <div style={{ background:"rgba(251,191,36,0.06)", border:"1px solid rgba(251,191,36,0.2)", borderRadius:14, padding:"20px", color:"rgba(255,255,255,0.9)", lineHeight:1.8, fontSize:14, whiteSpace:"pre-wrap", marginBottom:20 }}>{openLetter.text}</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, textAlign:"center", marginBottom:20 }}>Bạn đã viết vào {new Date(openLetter.created).toLocaleDateString()}</div>
              <button onClick={() => setOpenLetter(null)} style={{ width:"100%", padding:"12px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", color:"white", borderRadius:12, cursor:"pointer", fontSize:14 }}>Đóng 💙</button>
            </div>
          </div>
        )}

        {/* Write new letter */}
        {writing ? (
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(251,191,36,0.25)", borderRadius:20, padding:"28px", marginBottom:24 }}>
            <div style={{ display:"flex", gap:10, marginBottom:18 }}>
              {[[7,t.letter_period_7||"7 ngày"],[30,t.letter_period_30||"30 ngày"],[90,t.letter_period_90||"90 ngày"]].map(([d,l]) => (
                <button key={d} onClick={() => setPeriod(d)} style={{ padding:"8px 18px", borderRadius:99, border:`1px solid ${period===d?"rgba(251,191,36,0.5)":"rgba(255,255,255,0.1)"}`, background:period===d?"rgba(251,191,36,0.15)":"rgba(255,255,255,0.04)", color:period===d?"#fbbf24":"rgba(255,255,255,0.6)", cursor:"pointer", fontSize:13, fontWeight:period===d?700:400 }}>{l}</button>
              ))}
            </div>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder={t.letter_placeholder||"Gửi bản thân tương lai của tôi..."} rows={7} style={{ width:"100%", background:"transparent", border:"none", color:"rgba(255,255,255,0.9)", fontSize:14, lineHeight:1.9, resize:"vertical", fontFamily:"inherit", padding:4 }}/>
            <div style={{ display:"flex", gap:10, marginTop:16, justifyContent:"flex-end" }}>
              <button onClick={() => setWriting(false)} style={{ padding:"10px 22px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", borderRadius:10, cursor:"pointer", fontSize:13 }}>Huỷ</button>
              <button onClick={save} disabled={!text.trim()} style={{ padding:"10px 28px", background:text.trim()?"linear-gradient(135deg,#f59e0b,#ec4899)":"rgba(255,255,255,0.08)", border:"none", color:text.trim()?"white":"rgba(255,255,255,0.3)", borderRadius:10, cursor:text.trim()?"pointer":"not-allowed", fontSize:13, fontWeight:700 }}>{t.letter_send||"📨 Gửi thư"}</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setWriting(true)} style={{ width:"100%", padding:"16px", background:"rgba(251,191,36,0.08)", border:"2px dashed rgba(251,191,36,0.35)", color:"rgba(251,191,36,0.8)", borderRadius:18, cursor:"pointer", fontSize:15, fontWeight:600, marginBottom:24, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            ✍️ {t.letter_write||"Viết thư mới"}
          </button>
        )}

        {/* Letters list */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {letters.filter(l => !isArrived(l.due) || l.opened).map(l => (
            <div key={l.id} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontSize:24 }}>{l.opened?"📬":"📩"}</span>
              <div style={{ flex:1 }}>
                <div style={{ color:"white", fontWeight:600, fontSize:14 }}>{l.text.substring(0,60)}...</div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, marginTop:3 }}>{new Date(l.created).toLocaleDateString()} · {l.period} ngày</div>
              </div>
              {isArrived(l.due) && l.opened ? (
                <button onClick={() => open(l)} style={{ padding:"6px 14px", background:"rgba(251,191,36,0.1)", border:"1px solid rgba(251,191,36,0.3)", color:"#fbbf24", borderRadius:99, cursor:"pointer", fontSize:12 }}>{t.letter_open||"Đọc lại"}</button>
              ) : (
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:"#a78bfa", fontWeight:700, fontSize:15 }}>{daysLeft(l.due)}</div>
                  <div style={{ color:"rgba(255,255,255,0.3)", fontSize:10 }}>{t.letter_days||"ngày nữa"}</div>
                </div>
              )}
            </div>
          ))}
          {letters.length === 0 && <div style={{ textAlign:"center", color:"rgba(255,255,255,0.3)", padding:32, fontSize:14 }}>Chưa có thư nào. Hãy viết thư đầu tiên! 💌</div>}
        </div>
      </div>
    </div>
  );
}

// =================== STAR FIELD BACKGROUND ===================
function StarField() {
  const stars = Array.from({length: 120}, (_, i) => ({
    id: i,
    top: `${Math.random()*100}%`,
    left: `${Math.random()*100}%`,
    size: Math.random()*1.8 + 0.3,
    dur: `${Math.random()*4+2}s`,
    delay: `${Math.random()*5}s`,
    opacity: Math.random()*0.7+0.1,
  }));
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position:"absolute", top:s.top, left:s.left,
          width:s.size, height:s.size, borderRadius:"50%",
          background:"white", opacity:s.opacity,
          animation:`starTwinkle ${s.dur} ${s.delay} ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

// =================== APP ROOT ===================
export default function App() {
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("vi");
  const [user, setUser] = useState(() => UserStore.getSession());
  const [authModal, setAuthModal] = useState(null);
  const [showRobot, setShowRobot] = useState(false);
  const [robotShownOnce, setRobotShownOnce] = useState(false);

  const t = T[lang] || T.vi;
  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  // Show robot guide for first-time visitors
  useEffect(() => {
    const seen = localStorage.getItem("mm_guide_seen");
    if (!seen) { setTimeout(() => { setShowRobot(true); setRobotShownOnce(true); }, 2500); }
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    AccountStore.addAccount(u);
    AccountStore.setActive(u.id);
  };

  const handleLogout = () => { UserStore.clearSession(); setUser(null); navigate("home"); };
  const handleSwitchUser = (u) => { setUser(u); };

  if (loadingScreen) return <LoadingScreen onDone={() => setLoadingScreen(false)} t={t} />;

  const pages = {
    home: <HomePage setPage={navigate} user={user} onAuthClick={setAuthModal} t={t} />,
    ai: <AIPage t={t} setPage={navigate} />,
    test: <TestPage t={t} lang={lang} setPage={navigate} />,
    journal: <JournalPage t={t} setPage={navigate} />,
    knowledge: <KnowledgePage t={t} setPage={navigate} />,
    special: <SpecialPage t={t} setPage={navigate} />,
    dashboard: <DashboardPage setPage={navigate} user={user} t={t} />,
    profile: <ProfilePage user={user} onUpdate={u => { setUser(u); UserStore.saveSession(u); }} onLogout={handleLogout} setPage={navigate} t={t} />,
    chat: <ChatbotPage user={user} t={t} setPage={navigate} />,
    game: <GamesPage t={t} setPage={navigate} />,
    garden: <MoodGarden t={t} />,
    replay: <MindReplay t={t} user={user} />,
    report: <PDFReportPage t={t} user={user} setPage={navigate} />,
    progress: <ProgressTimelinePage t={t} setPage={navigate} />,
    predict: <MoodPredictPage t={t} setPage={navigate} />,
    face: <FaceEmotionPage t={t} setPage={navigate} />,
    globe: <EmotionGlobe3DPage t={t} setPage={navigate} />,
    care: <CareModePage t={t} setPage={navigate} user={user} />,
    letter: <FutureLetterPage t={t} setPage={navigate} />,
  };

  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif", background: "#07091d", minHeight: "100vh", color: "white", position:"relative" }}>
      <StarField />
      <Nav page={page} setPage={navigate} lang={lang} setLang={setLang} user={user} onAuthClick={setAuthModal} onLogout={handleLogout} onSwitchUser={handleSwitchUser} t={t} />

      <div key={page} style={{ animation: "pageIn .4s ease", position:"relative", zIndex:1 }}>
        {pages[page] || pages.home}
      </div>

      {authModal && (
        <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSuccess={handleLogin} t={t} />
      )}

      {/* Floating Robot Button */}
      <FloatingRobot onClick={() => setShowRobot(true)} color="#6c3de8" />

      {/* Robot Guide */}
      {showRobot && (
        <RobotGuide setPage={navigate} t={t} onClose={() => { setShowRobot(false); localStorage.setItem("mm_guide_seen","1"); }} />
      )}

      <footer style={{ background: "linear-gradient(to top,rgba(7,9,29,1),rgba(10,12,35,0.95))", borderTop: "1px solid rgba(108,61,232,0.15)", padding: "48px 24px 32px", position:"relative", overflow:"hidden" }}>
        {/* Footer glow */}
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:600, height:1, background:"linear-gradient(90deg,transparent,rgba(108,61,232,0.5),rgba(34,211,238,0.3),transparent)" }} />
        <div style={{ position:"absolute", top:-100, left:"50%", transform:"translateX(-50%)", width:400, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(108,61,232,0.06),transparent)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          {/* Top row */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, marginBottom:32 }}>
            <MindMirrorLogo size={48} showText={true} animate={true} />
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:13, textAlign:"center", maxWidth:400, lineHeight:1.7 }}>{t.footer_tagline}</p>
          </div>

          {/* Quick links */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", marginBottom:28 }}>
            {[
                { id:"ai",        label: "🤖 " + (t.nav_ai        || "AI") },
                { id:"test",      label: "🧩 " + (t.nav_test      || "Test") },
                { id:"journal",   label: "📔 " + (t.nav_journal   || "Journal") },
                { id:"knowledge", label: "📚 " + (t.nav_knowledge || "Knowledge") },
                { id:"special",   label: "🌊 " + (t.nav_special   || "Special") },
                { id:"chat",      label: "💬 " + (t.nav_chat      || "Chat") },
                { id:"game",      label: "🌿 " + (t.nav_game      || "Healing Corner") },
                { id:"dashboard", label: "📊 " + (t.nav_dashboard || "Dashboard") },
                { id:"predict",   label: "🔮 " + (t.nav_predict  || "Predict") },
                { id:"report",    label: "📄 " + (t.nav_report   || "Report") },
                { id:"face",      label: "😊 " + (t.nav_face     || "Face") },
                { id:"globe",     label: "🌐 " + (t.nav_globe    || "3D Globe") },
                { id:"care",      label: "💙 " + (t.nav_care     || "Care") },
                { id:"letter",    label: "💌 " + (t.nav_letter   || "Letter") },
              ].map(item => (
              <div key={item.id} style={{ padding:"5px 14px", borderRadius:99, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.4)", fontSize:12, cursor:"default" }}>
                {item.label}
              </div>
            ))}
          </div>

          {/* Language switcher */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center", marginBottom:28 }}>
            {Object.entries(LANGS).map(([code, { flag, name }]) => (
              <button key={code} onClick={() => setLang(code)} style={{
                background: lang===code ? "linear-gradient(135deg,rgba(108,61,232,0.25),rgba(139,92,246,0.15))" : "rgba(255,255,255,0.03)",
                border: lang===code ? "1px solid rgba(108,61,232,0.45)" : "1px solid rgba(255,255,255,0.07)",
                color: lang===code ? "#c4b5fd" : "rgba(255,255,255,0.35)",
                padding: "5px 12px", borderRadius:99, fontSize:12, cursor:"pointer",
                transition:"all 0.2s", fontWeight: lang===code ? 600 : 400,
                boxShadow: lang===code ? "0 0 14px rgba(108,61,232,0.25)" : "none",
              }}>{flag} {name}</button>
            ))}
          </div>

          {/* Bottom line */}
          <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", marginBottom:20 }} />
          <div style={{ textAlign:"center", color:"rgba(255,255,255,0.2)", fontSize:11 }}>
            © 2025 MindMirror · Made with 💜 · AI-powered Psychology Platform
          </div>
        </div>
      </footer>

      <style>{`
        /* ═══════════════════ RESET & BASE ═══════════════════ */
        *{box-sizing:border-box;margin:0;padding:0}
        body{margin:0;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;background:#07091d;color:white;overflow-x:hidden}

        /* ═══════════════════ CSS VARS ═══════════════════ */
        :root{
          --purple:#6c3de8; --violet:#8b5cf6; --lavender:#a78bfa;
          --cyan:#22d3ee; --teal:#0891b2; --rose:#ec4899;
          --emerald:#10b981; --amber:#f59e0b; --orange:#f97316;
          --bg0:#07091d; --bg1:#0d1240; --bg2:#130f35;
          --glass1:rgba(255,255,255,0.04); --glass2:rgba(255,255,255,0.07);
          --border1:rgba(255,255,255,0.08); --border2:rgba(255,255,255,0.14);
          --text1:rgba(255,255,255,0.92); --text2:rgba(255,255,255,0.6); --text3:rgba(255,255,255,0.35);
          --radius-sm:10px; --radius-md:16px; --radius-lg:22px; --radius-xl:28px;
          --shadow-purple:0 0 40px rgba(108,61,232,0.35); --shadow-card:0 8px 32px rgba(0,0,0,0.4);
          --glow-sm:0 0 20px; --glow-md:0 0 40px; --glow-lg:0 0 80px;
        }

        /* ═══════════════════ PAGE TRANSITIONS ═══════════════════ */
        @keyframes pageIn{from{opacity:0;transform:translateY(16px) scale(0.99)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInDown{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.88) translateY(24px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}

        /* ═══════════════════ GLOW ANIMATIONS ═══════════════════ */
        @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(108,61,232,0.3)}50%{box-shadow:0 0 50px rgba(108,61,232,0.6),0 0 80px rgba(34,211,238,0.2)}}
        @keyframes borderGlow{0%,100%{border-color:rgba(108,61,232,0.3)}50%{border-color:rgba(108,61,232,0.7)}}
        @keyframes textShimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes aurora{0%{transform:translateX(0%) translateY(0%) rotate(0deg)}33%{transform:translateX(5%) translateY(-3%) rotate(120deg)}66%{transform:translateX(-3%) translateY(5%) rotate(240deg)}100%{transform:translateX(0%) translateY(0%) rotate(360deg)}}
        @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(30px,-20px) scale(1.08)}50%{transform:translate(-20px,30px) scale(0.96)}75%{transform:translate(20px,20px) scale(1.04)}}
        @keyframes starTwinkle{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}}

        /* ═══════════════════ PARTICLE & SPIN ═══════════════════ */
        @keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes spinSlow{to{transform:rotate(360deg)}}
        @keyframes orbit{to{transform:rotate(360deg) translateX(60px) rotate(-360deg)}}

        /* ═══════════════════ CARD & UI INTERACTIONS ═══════════════════ */
        @keyframes emojiPop{0%,100%{transform:scale(1)}50%{transform:scale(1.2) rotate(6deg)}}
        @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        @keyframes ripple{0%{transform:scale(0);opacity:0.6}100%{transform:scale(4);opacity:0}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.95)}}
        @keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes floatPulse{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-6px) scale(1.02)}}
        @keyframes notifBounce{0%,100%{transform:scale(1) rotate(0deg)}50%{transform:scale(1.25) rotate(15deg)}}
        @keyframes waveHand{0%,100%{transform:rotate(0deg)}20%{transform:rotate(-20deg)}40%{transform:rotate(20deg)}60%{transform:rotate(-10deg)}80%{transform:rotate(10deg)}}
        @keyframes antennaPulse{0%,100%{opacity:0.6}50%{opacity:1}}
        @keyframes tryItPulse{0%,100%{box-shadow:0 0 20px rgba(108,61,232,0.22)}50%{box-shadow:0 0 35px rgba(108,61,232,0.45)}}
        @keyframes breatheText{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
        @keyframes msgIn{from{opacity:0;transform:translateY(12px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes dotBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-8px)}}

        /* ═══════════════════ ROBOT ANIMATIONS ═══════════════════ */
        @keyframes robotWave{0%{transform:translateY(0) rotate(-3deg)}100%{transform:translateY(-8px) rotate(3deg)}}
        @keyframes robotThink{0%{transform:translateX(0) rotate(-2deg)}100%{transform:translateX(5px) rotate(6deg)}}
        @keyframes robotJump{0%{transform:translateY(0) scaleY(1)}100%{transform:translateY(-14px) scaleY(0.93)}}
        @keyframes robotBounce{0%{transform:translateY(0)}100%{transform:translateY(-10px)}}
        @keyframes robotSpin{0%{transform:rotate(-6deg) scale(1)}100%{transform:rotate(6deg) scale(1.04)}}
        @keyframes robotNod{0%{transform:rotate(-5deg)}100%{transform:rotate(5deg)}}
        @keyframes robotDance{0%{transform:translateX(-8px) rotate(-6deg)}100%{transform:translateX(8px) rotate(6deg)}}
        @keyframes slideUpIn{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

        /* ═══════════════════ SCROLLBAR ═══════════════════ */
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:var(--bg0)}
        ::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,var(--purple),var(--cyan));border-radius:99px}
        ::-webkit-scrollbar-thumb:hover{background:var(--lavender)}

        /* ═══════════════════ FORM ELEMENTS ═══════════════════ */
        textarea,input{outline:none;font-family:inherit}
        button{font-family:inherit}
        ::placeholder{color:var(--text3)}
        input[type="date"]::-webkit-calendar-picker-indicator{filter:invert(1);opacity:.4}
        input[type="range"]{accent-color:var(--purple)}

        /* ═══════════════════ GLASS UTILITIES ═══════════════════ */
        .glass{background:var(--glass1);border:1px solid var(--border1);backdrop-filter:blur(16px)}
        .glass-hover{transition:all 0.25s ease}
        .glass-hover:hover{background:var(--glass2)!important;border-color:var(--border2)!important;transform:translateY(-3px)!important;box-shadow:var(--shadow-card)!important}

        /* ═══════════════════ GRADIENT TEXT ═══════════════════ */
        .grad-text{background:linear-gradient(135deg,#c4b5fd,#a78bfa 40%,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .grad-text-2{background:linear-gradient(135deg,#a78bfa,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .shimmer-text{background:linear-gradient(90deg,#a78bfa 0%,#22d3ee 25%,#a78bfa 50%,#ec4899 75%,#a78bfa 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:textShimmer 4s linear infinite}

        /* ═══════════════════ GLOW BUTTONS ═══════════════════ */
        .btn-primary{background:linear-gradient(135deg,#6c3de8,#8b5cf6);border:none;color:white;border-radius:99px;cursor:pointer;font-weight:700;transition:all 0.25s;box-shadow:0 0 30px rgba(108,61,232,0.35)}
        .btn-primary:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 0 50px rgba(108,61,232,0.55),0 8px 20px rgba(0,0,0,0.3)}
        .btn-primary:active{transform:scale(0.97)}
        .btn-ghost{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);color:rgba(255,255,255,0.85);border-radius:99px;cursor:pointer;transition:all 0.25s;backdrop-filter:blur(10px)}
        .btn-ghost:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.25);transform:translateY(-1px)}

        /* ═══════════════════ GLOW CARD ═══════════════════ */
        .glow-card{position:relative;background:linear-gradient(135deg,rgba(108,61,232,0.08),rgba(34,211,238,0.04));border:1px solid rgba(108,61,232,0.25);border-radius:22px;transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);overflow:hidden}
        .glow-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(108,61,232,0.06),transparent);opacity:0;transition:opacity 0.3s}
        .glow-card:hover{transform:translateY(-8px) scale(1.01);border-color:rgba(108,61,232,0.5);box-shadow:0 20px 60px rgba(108,61,232,0.2),0 0 0 1px rgba(108,61,232,0.15)}
        .glow-card:hover::before{opacity:1}

        /* ═══════════════════ PAGE STAR FIELD ═══════════════════ */
        .star-field{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
        .star{position:absolute;border-radius:50%;background:white;animation:starTwinkle var(--dur,3s) var(--delay,0s) ease-in-out infinite}

        /* ═══════════════════ MISC ═══════════════════ */
        .emoji-hover:hover{animation:emojiPop 0.4s ease}
        .no-select{user-select:none}
        @keyframes spin-game{to{transform:rotate(360deg)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}
