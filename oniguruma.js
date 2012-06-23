/*
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                   Version 2, December 2004
 *
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 *********************************************************************/

Oniguruma = (function () {
	var onig_init = cwrap('onig_init', 'number', []);
	var onig_end = cwrap('onig_end', 'number', []);
	var onig_version = cwrap('onig_version', 'string', []);

	var onig_error_code_to_str = cwrap('onig_error_code_to_str', 'number', ['number', 'number', 'number']);
	var onig_set_warn_func = cwrap('onig_set_warn_func', 'void', ['number']); // FIXME: this should get a callback
	var onig_set_verb_warn_func = cwrap('onig_set_verb_warn_func', 'void', ['number']); // FIXME: this should get a callback

	var onig_new = cwrap('onig_new', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number']);
	var onig_new_without_alloc = cwrap('onig_new_without_alloc', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number']);
	var onig_new_deluxe = cwrap('onig_new_deluxe', 'number', ['number', 'number', 'number', 'number', 'number']);

	var onig_free = cwrap('onig_free', 'void', ['number']);
	var onig_free_body = cwrap('onig_free_body', 'void', ['number']);

	var onig_search = cwrap('onig_search', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number']);
	var onig_match = cwrap('onig_match', 'number', ['number', 'number', 'number', 'number', 'number', 'number']);

	var onig_region_new('onig_region_new', 'number', []);
	var onig_region_free('onig_region_free', 'void', ['number', 'number']);
	var onig_region_copy('onig_region_copy', 'void', ['number', 'number']);
	var onig_region_clear('onig_region_clear', 'void', ['number']);
	var onig_region_resize('onig_region_resize', 'number', ['number', 'number']);

	var onig_name_to_group_numbers = cwrap('onig_name_to_group_numbers', 'number', ['number', 'number', 'number', 'number']);
	var onig_name_to_backref_number = cwrap('onig_name_to_backref_number', 'number', ['number', 'number', 'number', 'number']);

	var onig_foreach_name = cwrap('onig_foreach_name', 'number', ['number', 'number', 'number']);

	var onig_number_of_names = cwrap('onig_number_of_names', 'number', ['number']);
	var onig_number_of_captures = cwrap('onig_number_of_captures', 'number', ['number']);
	var onig_number_of_capture_histories = cwrap('onig_number_of_capture_histories', 'number', ['number']);

	var onig_get_encoding = cwrap('onig_get_encoding', 'number', ['number']);
	var onig_get_options = cwrap('onig_get_options', 'number', ['number']);
	var onig_get_case_fold_flag = cwrap('onig_get_case_fold_flag', 'number', ['number']);
	var onig_get_syntax = cwrap('onig_get_syntax', 'number', ['number']);

	var onig_get_capture_tree = cwrap('onig_get_capture_tree', 'number', ['number']);
	var onig_capture_tree_traverse = cwrap('onig_capture_tree_traverse', 'number', ['number', 'number', 'number', 'number']);
	var onig_noname_group_capture_is_active = cwrap('onig_noname_group_capture_is_active', 'number', ['number']);

	var onigenc_get_prev_char_head = cwrap('onigenc_get_prev_char_head', 'number', ['number', 'number', 'number']);
	var onigenc_get_left_adjust_char_head = cwrap('onigenc_get_left_adjust_char_head', 'number', ['number', 'number', 'number']);
	var onigenc_get_right_adjust_char_head = cwrap('onigenc_get_right_adjust_char_head', 'number', ['number', 'number', 'number']);

	var onigenc_strlen = cwrap('onigenc_strlen', 'number', ['number', 'number', 'number']);
	var onigenc_strlen_null = cwrap('onigenc_strlen_null', 'number', ['number', 'number']);
	var onigenc_str_bytelen_null = cwrap('onigenc_str_bytelen_null', 'number', ['number', 'number']);

	var onig_set_default_syntax = cwrap('onigenc_set_default_syntax', 'number', ['number']);
	var onig_copy_syntax = cwrap('onigenc_copy_syntax', 'number', ['number']);

	var onig_get_syntax_op = cwrap('onigenc_get_syntax_op', 'number', ['number']);
	var onig_get_syntax_op2 = cwrap('onigenc_get_syntax_op2', 'number', ['number']);
	var onig_get_syntax_behavior = cwrap('onigenc_get_syntax_behavior', 'number', ['number']);
	var onig_get_syntax_options = cwrap('onigenc_get_syntax_options', 'number', ['number']);

	var onig_set_syntax_op = cwrap('onigenc_set_syntax_op', 'void', ['number', 'number']);
	var onig_set_syntax_op2 = cwrap('onigenc_set_syntax_op2', 'void', ['number', 'number']);
	var onig_set_syntax_behavior = cwrap('onigenc_set_syntax_behavior', 'void', ['number', 'number']);
	var onig_set_syntax_options = cwrap('onigenc_set_syntax_options', 'void', ['number', 'number']);

	var onig_copy_encoding = cwrap('onig_copy_encoding', 'void', ['number', 'number']);

	var onig_set_meta_char = cwrap('onig_set_meta_char', 'number', ['number', 'number', 'number']);

	var onig_get_default_case_fold_flag = cwrap('onig_get_default_case_fold_flag', 'number', []);
	var onig_set_default_case_fold_flag = cwrap('onig_set_default_case_fold_flag', 'number', ['number']);

	var onig_get_match_stack_limit_size = cwrap('onig_get_match_stack_limit_size', 'number', []);
	var onig_set_match_stack_limit_size = cwrap('onig_set_match_stack_limit_size', 'number', ['number']);

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Oniguruma;
}
