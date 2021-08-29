let global = {}

global.UNIT_ID = "4a66d9c4-8f7a-44b8-a992-ab6f370b85c6";
global.EP = "resident"
global.centivizerpeople = "centivizerpeople"
global.EPAU = "EPAU"
global.ENPAU = "ENPAU"
global.resident = "resident"
global.admin = "admin"
global.staff = "staff"
global.system = "system"
global.centivizerpeople = "centivizerpeople"
global.chart_display_frequency = "frequency"
global.chart_display_duration_total = "duration_total"
global.chart_display_duration_average = "duration_average"
global.chart_display_distance_total = "distance_total"
global.chart_display_distance_average = "distance_average"
global.chart_display_maps_usage = "maps from most played to least"

//CSS global variables
global.basic_container_h5_static_style = "white-space:nowrap; display: inline-block; padding-left:5px; ";
//max width of mobile screen
//trim the string property so the integer value can be set as a global variable
let maxMobileScreenSize = getComputedStyle(document.documentElement).getPropertyValue('--mobile-max-screen-width');
maxMobileScreenSize = maxMobileScreenSize.substring(0,maxMobileScreenSize.indexOf('px'));

global.max_mobile_screen_width = parseInt(maxMobileScreenSize);
//basic-container padding
let basicContainerPadding = getComputedStyle(document.documentElement).getPropertyValue('--basic-container-padding');
basicContainerPadding = basicContainerPadding.substring(0,basicContainerPadding.indexOf('px'));

global.basic_container_padding = parseInt(basicContainerPadding);
//basic-container padding - MOBILE
let basicContainerPaddingMobile = getComputedStyle(document.documentElement).getPropertyValue('--basic-container-padding-mobile');
basicContainerPaddingMobile  = basicContainerPaddingMobile.substring(0,basicContainerPaddingMobile.indexOf('px'));

global.basic_container_padding_mobile = parseInt(basicContainerPaddingMobile);
//basic-container-h5 font-size
let basicContainerH5FontSize = getComputedStyle(document.documentElement).getPropertyValue('--basic-container-h5-font-size');
basicContainerH5FontSize = basicContainerH5FontSize.substring(0,basicContainerH5FontSize.indexOf('em'));

global.basic_container_h5_font_size_EM = parseFloat(basicContainerH5FontSize);

// exports.EP = "EP"
// exports.EPAU = "EPAU"
// exports.ENPAU = "ENPAU"
// exports.resident = "resident"
// exports.admin = "admin"
// exports.staff = "staff"
// exports.system = "system"
// exports.centivizerpeople = "centivizerpeople"

//routing tab names
global.home = 'Home';
global.profiles = 'Profiles';
global.friends = 'Friends';
global.video_call = 'Video-Call';
global.media = 'Media';
global.ProfileEdit = 'Profile'

global.friend_field = "friends"
global.list_id_media_EP_send_to = "list_id_media_EP_send_to"


global.friends_friends = 'Friends-Friends';
global.friends_friend_requests = 'Friends-Friend-Requests';

global.video_call_online = 'Video-Call-Online';
global.video_call_contact_list = 'Video-Call-Contact-List';

global.media_feed = 'Media_Feed';
global.media_uploads = 'Media_Uploads';
global.media_post_new = 'Media_Post_New';
global.null = 'null';

global.file_upload_profile_picture_id = 'file_upload_profile_picture_id'
global.file_upload_send_to_profile_id = 'file_upload_send_to_profile_id'

global.bar_chart_max_thickness = 40

global.video_streaming_initiated_login = 'video_streaming_initiated_login'
global.video_streaming_initiated_send_call_request = 'video_streaming_initiated_send_call_request'
global.video_streaming_initiated_revoke_call_request = 'video_streaming_initiated_revoke_call_request'
global.video_streaming_initiated_reject_call_request = 'video_streaming_initiated_reject_call_request'
global.video_streaming_initiated_accept_call_request = 'video_streaming_initiated_accept_call_request'
global.video_streaming_initiated_end_call = 'video_streaming_initiated_end_call'


global.video_streaming_received_send_call_request = 'video_streaming_received_send_call_request'
global.video_streaming_received_revoke_call_request = 'video_streaming_received_revoke_call_request'
global.video_streaming_received_reject_call_request = 'video_streaming_received_reject_call_request'
global.video_streaming_received_accept_call_request = 'video_streaming_received_accept_call_request'
global.video_streaming_received_unexpect_disconnection = 'video_streaming_received_unexpect_disconnection'
global.video_streaming_received_end_call = 'video_streaming_received_end_call'
""

global.video_streaming_error_failedToSendCallRequest = 'video_streaming_error_failedToSendCallRequest'
global.video_streaming_error_failedToRevokeCallRequest = 'video_streaming_error_failedToRevokeCallRequest'
global.video_streaming_error_failedToRejectCallRequest = 'video_streaming_error_failedToRejectCallRequest'
global.video_streaming_error_failedToAcceptCallRequest = 'video_streaming_error_failedToAcceptCallRequest'
global.video_streaming_error_failedToEndCall = 'video_streaming_error_failedToEndCall'
global.video_streaming_error_critical = 'video_streaming_error_critical'
