<script nonce="{{ csrf_token() }}">
    window.Render = {!! json_encode($view_shared_data) !!};
</script>

@if(isset($view_shared_data['page']))
    <script src="{{ hashed_asset($view_shared_data['page'] . '.js') }}" nonce="{{ csrf_token() }}"></script>
@endif